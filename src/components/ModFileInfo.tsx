import React, { useEffect, useState } from "react";

interface ModFileProps {
  projectID: number;
  fileID: number;
}

interface ModFileData {
  displayName: string;
  fileName: string;
  gameVersions: string[];
}

const ModFileInfo: React.FC<ModFileProps> = ({ projectID, fileID }) => {
  const [modFileData, setModFileData] = useState<ModFileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModFileData = async () => {
      try {
        const response = await fetch(
          `https://www.curseforge.com/api/v1/mods/${projectID}/files/${fileID}/`,
          {
            method: "GET",
          }
        );

        const data = await response.json();
        setModFileData({
          displayName: data.data.displayName,
          fileName: data.data.fileName,
          gameVersions: data.data.gameVersions,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching mod file data:", error);
        setLoading(false);
      }
    };

    fetchModFileData();
  }, [projectID, fileID]);

  useEffect(() => {
    const headers = {
      Accept: "application/json",
      "x-api-key": "JDJhJDEwJFhkNkhYT3dweFI1UTIvWGpyZjBkUC5hSDFaRDE5T3pRZC9mVnVNLk94QXJJL01DTlZtNHZh",
    };
    const fetchModData = async () => {
      try {
        const response = await fetch(
          `https://www.curseforge.com/api/v1/mods/${projectID}`,
          {
            method: "GET",
            headers: headers,
          }
        );

        const data = await response.json();
        setModFileData({
          displayName: data.data.displayName,
          fileName: data.data.fileName,
          gameVersions: data.data.gameVersions,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching mod file data:", error);
        setLoading(false);
      }
    };

    fetchModData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!modFileData) {
    return <div>Error loading mod file data.</div>;
  }

  return (
    <li>
      <strong>{modFileData.displayName}</strong> ({modFileData.fileName})
      <div>Game Versions: {modFileData.gameVersions.join(", ")}</div>
    </li>
  );
};

export default ModFileInfo;
