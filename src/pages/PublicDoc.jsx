import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

const PublicDoc = () => {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/api/public-documents/${id}/`)
      .then((res) => setDoc(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!doc) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{doc.title}</h2>
      <pre>{doc.content}</pre>
    </div>
  );
};

export default PublicDoc;
