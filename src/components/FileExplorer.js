import React, { useState } from "react";
import "./style.css";

const FileExplorer = () => {
  const [structure, setStructure] = useState({
    root: { type: "folder", children: {} },
    public: { type: "folder", children: {} },
    src: { type: "folder", children: {} },
    "package.json": { type: "file" },
  });

  const handleAdd = (parent, type) => {
    const name = prompt(`Enter ${type} name:`)?.trim();
    if (!name) return;

    setStructure((prev) => {
      const updated = { ...prev };
      if (updated[parent]?.type === "folder") {
        updated[parent].children[name] = { type, children: type === "folder" ? {} : null };
      }
      return updated;
    });
  };

  const renderItems = (items) => {
    return Object.entries(items).map(([name, item]) => (
      <div key={name} className="item">
        <span className="file-folder">{name}</span>
        {item.type === "folder" && (
          <>
            <button onClick={() => handleAdd(name, "folder")}>Folder +</button>
            <button onClick={() => handleAdd(name, "file")}>File +</button>
            <div className="nested">{renderItems(item.children)}</div>
          </>
        )}
      </div>
    ));
  };

  return <div className="explorer">{renderItems(structure)}</div>;
};

export default FileExplorer;
