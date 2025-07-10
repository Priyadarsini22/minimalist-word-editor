import React, { useContext, useEffect, useState } from "react";
import Toolbar from "../components/Toolbar";
import Editor from "../components/Editor";
import GoalTimer from "../components/GoalTimer";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../api/axios";
import jsPDF from "jspdf";
import "../App.css";

const Dashboard = () => {
 const { accessToken, loading: authLoading } = useContext(AuthContext);

  const [docs, setDocs] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [loadingDocs, setLoadingDocs] = useState(true);

  // 📥 Fetch documents once token & auth state are ready
  useEffect(() => {
    if (authLoading || !accessToken) return;
    setLoadingDocs(true);
    axiosInstance.get("api/documents/", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => setDocs(res.data))
      .catch((err) => console.error("❌ Fetch docs error:", err))
      .finally(() => setLoadingDocs(false));
  }, [authLoading, accessToken]);

  // 💾 Save new doc
  const handleSave = () => {
    if (!content.trim()) return;
    axiosInstance.post(
      "api/documents/",
      { title: title || "Untitled", content },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
      .then((res) => {
        setDocs((prev) => [...prev, res.data]);
        setContent("");
        setTitle("");
      })
      .catch((err) => console.error("❌ Save doc error:", err));
  };

  // ✏ Update doc
  const handleUpdate = (doc) => {
    axiosInstance.put(
      `api/documents/${doc.id}/`,
      { title: doc.title, content: doc.content },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
      .then((res) => console.log("✅ Updated:", res.data))
      .catch((err) => console.error("❌ Update doc error:", err));
  };

  // 🗑 Delete doc
  const handleDelete = (id) => {
    axiosInstance.delete(`api/documents/${id}/`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(() => setDocs((prev) => prev.filter((doc) => doc.id !== id)))
      .catch((err) => console.error("❌ Delete doc error:", err));
  };

  // 🔁 Edit doc locally
  const handleDocChange = (id, key, value) => {
    setDocs((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, [key]: value } : doc))
    );
  };

  // 📤 Download as TXT
  const handleDownloadTxt = (doc) => {
    const file = new Blob([doc.content], { type: "text/plain" });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = `${doc.title || "document"}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // 📄 Download as PDF
  const handleDownloadPDF = (title, content) => {
    const pdf = new jsPDF();
    pdf.text(content, 10, 10);
    pdf.save(`${title || "document"}.pdf`);
  };

  // 🔍 Filter & sort
  const filteredDocs = docs
    .filter((doc) => doc.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) =>
      sortOrder === 'newest'
        ? new Date(b.updated_at) - new Date(a.updated_at)
        : new Date(a.updated_at) - new Date(b.updated_at)
    );

  // Show loading or login state
  if (authLoading) {
    return <div className="p-4">Loading authentication...</div>;
  }

  if (!accessToken) {
    return <div className="p-4">Please log in to view your dashboard.</div>;
  }

  return (
    <div className="app-container">
      <Toolbar />
      <div className="editor-section">
        <GoalTimer />
        <input
          type="text"
          placeholder="Enter document title..."
          className="w-full border p-2 rounded mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Editor content={content} setContent={setContent} />
        <button onClick={handleSave} className="save-btn mt-2">
          Save Document
        </button>
      </div>

      <div className="documents-section p-4">
        <h2 className="text-xl font-semibold mb-2">Your Saved Documents</h2>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-1 rounded"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border p-1 rounded"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        {loadingDocs ? (
          <p>Loading your documents...</p>
        ) : (
          <ul className="space-y-4">
            {filteredDocs.map((doc) => (
              <li key={doc.id} className="p-4 border rounded bg-white shadow">
                <input
                  type="text"
                  value={doc.title}
                  onChange={(e) => handleDocChange(doc.id, "title", e.target.value)}
                  className="w-full border p-2 mb-2 rounded font-bold"
                />
                <textarea
                  value={doc.content}
                  onChange={(e) => handleDocChange(doc.id, "content", e.target.value)}
                  className="w-full border p-2 mb-2 rounded"
                />
                <div className="flex gap-2 flex-wrap">
                  <button onClick={() => handleUpdate(doc)} className="bg-blue-500 text-white px-3 py-1 rounded">Update</button>
                  <button onClick={() => handleDelete(doc.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                  <button onClick={() => handleDownloadTxt(doc)} className="bg-green-600 text-white px-3 py-1 rounded">Download TXT</button>
                  <button onClick={() => handleDownloadPDF(doc.title, doc.content)} className="bg-purple-600 text-white px-3 py-1 rounded">Download PDF</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
