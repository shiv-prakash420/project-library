import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles.css";

export default function Authors() {
  const [authors, setAuthors] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  const load = async () => {
    const res = await api.get("/authors");
    setAuthors(res.data);
  };

  const create = async () => {
    await api.post("/authors", { name });
    setName("");
    load();
  };

  const startEdit = (author: any) => {
    setEditId(author.id);
    setEditName(author.name);
  };

  const saveEdit = async (id: number) => {
    await api.patch(`/authors/${id}`, { name: editName });
    setEditId(null);
    load();
  };

  const remove = async (id: number) => {
    try{
      await api.delete(`/authors/${id}`);
      load();
    } catch (err: any) {
      alert(err.response?.data?.message || "Error deleting author");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="page-container">
      <h2>Authors</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          placeholder="New author"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={create}>Add</button>
      </div>

      <hr />

      {authors.map((a) => (
        <div className="list-item" key={a.id}>
          {editId === a.id ? (
            <>
              <input
                style={{ flex: 1 }}
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <div className="action-buttons">
                <button onClick={() => saveEdit(a.id)}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <div>{a.name}</div>
              <div className="action-buttons">
                <button onClick={() => startEdit(a)}>Edit</button>
                <button onClick={() => remove(a.id)}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
