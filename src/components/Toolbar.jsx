import React, { useState, useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import "../App.css";

export default function Toolbar() {
  const [fontSize, setFontSize] = useState(16);
  const { logout } = useContext(AuthContext);

  const applyStyle = (command) => {
    document.execCommand(command, false, null);
  };

  const handleFontChange = (e) => {
    document.execCommand("fontName", false, e.target.value);
  };

  return (
    <div className="toolbar">
      <select onChange={handleFontChange}>
        <option value="Arial">Arial</option>
        <option value="Georgia">Georgia</option>
        <option value="Courier New">Courier New</option>
      </select>

      <button onClick={() => applyStyle("bold")}><b>B</b></button>
      <button onClick={() => applyStyle("italic")}><i>I</i></button>
      <button onClick={() => applyStyle("underline")}><u>U</u></button>

      <input
        type="range"
        min="12"
        max="36"
        value={fontSize}
        onChange={(e) => {
          setFontSize(e.target.value);
          document.getElementById("editor").style.fontSize = `${e.target.value}px`;
        }}
      />

      <button 
        onClick={logout} 
        className="bg-gray-800 text-white px-2 py-1 rounded ml-2"
      >
        Logout
      </button>
    </div>
  );
}
