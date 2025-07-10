import React, { useState, useEffect } from "react";

const Editor = ({ doc, setDoc, handleUpdate }) => {
  const [isPublic, setIsPublic] = useState(doc?.is_public || false);
  const [content, setContent] = useState(doc?.content || "");

  // Keep parent state in sync
  useEffect(() => {
    setDoc(prev => ({ ...prev, content, is_public: isPublic }));
  }, [content, isPublic, setDoc]);

  // Auto-save/debounce: update parent doc after 2 seconds of pause
  useEffect(() => {
    if (!handleUpdate) return;  // only run if handleUpdate is passed
    const timer = setTimeout(() => {
      if (doc.id && content.trim() !== "") {
        handleUpdate({ ...doc, content, is_public: isPublic });
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [content, isPublic, doc, handleUpdate]);

  return (
    <div className="editor-container">
      <textarea
        id ="editor"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start writing your document..."
      />
      <label>
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        Make Public
      </label>
    </div>
  );
};

export default Editor;
