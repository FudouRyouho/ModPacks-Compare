import React, { useState } from 'react';

interface ModFile {
  projectID: number;
  fileID: number;
  required: boolean;
}

interface Manifest {
  files: ModFile[];
}

const ModpackComparator: React.FC = () => {
  const [modpack1, setModpack1] = useState<Manifest | null>(null);
  const [modpack2, setModpack2] = useState<Manifest | null>(null);
  const [comparisonResult, setComparisonResult] = useState<string[]>([]);

  // Función para leer el archivo y guardarlo en el estado
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<Manifest | null>>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        try {
          const manifest: Manifest = JSON.parse(content);
          setFile(manifest);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  // Función para comparar dos modpacks
  const compareModpacks = () => {
    if (modpack1 && modpack2) {
      const differences: string[] = [];

      // Convertir la lista de mods en mapas para comparación fácil
      const modMap1 = new Map(modpack1.files.map((mod) => [mod.projectID, mod.fileID]));
      const modMap2 = new Map(modpack2.files.map((mod) => [mod.projectID, mod.fileID]));

      // Comparar mods que están en el modpack 1 pero no en el modpack 2
      modMap1.forEach((fileID, projectID) => {
        if (!modMap2.has(projectID)) {
          differences.push(`Mod with projectID ${projectID} is missing in modpack 2`);
        } else if (modMap2.get(projectID) !== fileID) {
          differences.push(`Mod with projectID ${projectID} has different versions in modpacks (fileID: ${fileID} vs ${modMap2.get(projectID)})`);
        }
      });

      // Comparar mods que están en el modpack 2 pero no en el modpack 1
      modMap2.forEach((fileID, projectID) => {
        if (!modMap1.has(projectID)) {
          differences.push(`Mod with projectID ${projectID} is missing in modpack 1`);
        }
      });

      setComparisonResult(differences.length > 0 ? differences : ['No differences found']);
    }
  };

  return (
    <div>
      <h1>Modpack Comparator</h1>
      <div>
        <h2>Upload Modpack 1</h2>
        <input type="file" onChange={(e) => handleFileUpload(e, setModpack1)} accept=".json" />
      </div>
      <div>
        <h2>Upload Modpack 2</h2>
        <input type="file" onChange={(e) => handleFileUpload(e, setModpack2)} accept=".json" />
      </div>
      <button onClick={compareModpacks}>Compare Modpacks</button>

      <div>
        <h3>Comparison Result:</h3>
        <ul>
          {comparisonResult.map((difference, index) => (
            <li key={index}>{difference}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ModpackComparator;
