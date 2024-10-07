import React, { useState } from "react";
import ModsList from "./modsList";

export interface ModFile {
  projectID: number;
  fileID: number;
  required: boolean;
}

export interface MinecraftInfo {
  version: string;
  modLoaders: {
    id: string;
    primary: boolean;
  }[];
}

export interface Manifest {
  files: ModFile[];
  minecraft: MinecraftInfo;
  manifestType: string;
  manifestVersion: number;
  name: string;
  version: string;
  author: string;
}

const Upload: React.FC = () => {
  const [filesUpload, setFilesUpload] = useState<Manifest[]>([]);
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newManifests: Manifest[] = [];

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          try {
            const manifest: Manifest = JSON.parse(content);
            newManifests.push(manifest);

            // Actualizar el estado cuando se procesan todos los archivos
            if (newManifests.length === files.length) {
              setFilesUpload((prevFiles) => [...prevFiles, ...newManifests]);
            }
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        };
        reader.readAsText(file);
      });
    }
  };

  const removeFile = (index: number) => {
    setFilesUpload((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Upload Modpack(s)</h2>
      <div className="flex flex-cols">
        <input
          type="file"
          onChange={handleFileUpload}
          accept=".json"
          multiple
        />
        {true && (
          <ul>
            {filesUpload.map((manifest, index) => (
              <li key={index}>
                <strong>{manifest.name || `Modpack ${index + 1}`}</strong>{" "}
                <br />
                <em>Version: {manifest.version || "Unknown"}</em> <br />
                <em>Minecraft Version: {manifest.minecraft.version}</em> <br />
                <em>Loader: {manifest.minecraft.modLoaders[0]?.id}</em> <br />
                <button onClick={() => removeFile(index)}>Remove</button>
                <ul>
                  {manifest.files.map((modFile, idx) => (
                    <li key={idx}>
                      ProjectID: {modFile.projectID}, FileID: {modFile.fileID}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
        <ModsList file={filesUpload} />
      </div>
    </div>
  );
};

export default Upload;
