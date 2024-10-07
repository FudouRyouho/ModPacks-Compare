import React from "react";
import { Manifest } from "./upload";
import ModFileInfo from "./ModFileInfo";

interface IProps {
  file: Manifest[];
}

const ModsList: React.FC<IProps> = ({ file }) => {
  return (
    <div className="bg-slate-800 p-2">
      {file.map((file, index) => (
        <div key={index}>
          <div className="flex flex-col">
            <span>{file.name || `Modpack ${index + 1}`}</span>
            <span>Version: {file.version || "Unknown"}</span>
            <span>Loader: {file.minecraft.modLoaders[0]?.id}</span>
          </div>
          <ul>
            {file.files.map((modFile, idx) => (
              <ModFileInfo
                key={idx}
                projectID={modFile.projectID}
                fileID={modFile.fileID}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ModsList;
