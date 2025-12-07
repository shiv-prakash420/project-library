import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles.css";

export default function Books() {
  const [books, setBooks] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("");

  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAuthorId, setEditAuthorId] = useState("");

  const load = async () => {
    const resBooks = await api.get("/books");
    const resAuthors = await api.get("/authors");
    setBooks(resBooks.data);
    setAuthors(resAuthors.data);
  };

  const create = async () => {
    await api.post("/books", { title, authorId: Number(authorId) });
    setTitle("");
    setAuthorId("");
    load();
  };

  const startEdit = (b: any) => {
    setEditId(b.id);
    setEditTitle(b.title);
    setEditAuthorId(b.authorId);
  };

  const saveEdit = async (id: number) => {
    await api.patch(`/books/${id}`, {
      title: editTitle,
      authorId: Number(editAuthorId),
    });
    setEditId(null);
    load();
  };

  const remove = async (id: number) => {
    try{
      await api.delete(`/books/${id}`);
      load();
    } catch (err: any) {
      alert(err.response?.data?.message || "Error deleting book");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="page-container">
      <h2>Books</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <input
          placeholder="New book title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
          <option value="">Choose Author</option>
          {authors.map((a) => (
            <option value={a.id} key={a.id}>
              {a.name}
            </option>
          ))}
        </select>

        <button onClick={create}>Add</button>
      </div>

      <hr />

      {books.map((b) => (
        <div className="list-item" key={b.id}>
          {editId === b.id ? (
            <>
              <input
                style={{ flex: 1 }}
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <select
                value={editAuthorId}
                onChange={(e) => setEditAuthorId(e.target.value)}
              >
                {authors.map((a) => (
                  <option value={a.id} key={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>

              <div className="action-buttons">
                <button onClick={() => saveEdit(b.id)}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <div>
                <strong>{b.title}</strong>  
                <span style={{ opacity: 0.6 }}> — {b.author?.name}</span>
              </div>

              <div className="action-buttons">
                <button onClick={() => startEdit(b)}>Edit</button>
                <button onClick={() => remove(b.id)}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
