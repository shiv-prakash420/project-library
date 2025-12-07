import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles.css";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const load = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  const create = async () => {
    await api.post("/users", { name, email });
    setName("");
    setEmail("");
    
    load();
  };

  const startEdit = (u: any) => {
    setEditId(u.id);
    setEditName(u.name);
    setEditEmail(u.email);
  };

  const saveEdit = async (id: number) => {
    await api.patch(`/users/${id}`, {
      name: editName,
      email: editEmail,
    });
    setEditId(null);
    load();
  };

  const remove = async (id: number) => {
    try {
    await api.delete(`/users/${id}`);
    load();
  } catch (err: any) {
    alert(err.response?.data?.message || "Error deleting user");
  }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="page-container">
      <h2>Users</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {/* <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /> */}
        <button onClick={create}>Create</button>
      </div>

      <hr />

      {users.map((u) => (
        <div className="list-item" key={u.id}>
          {editId === u.id ? (
            <>
              <input value={editName} onChange={(e) => setEditName(e.target.value)} />
              <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
              <div className="action-buttons">
                <button onClick={() => saveEdit(u.id)}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <div>{u.name} — {u.email}</div>
              <div className="action-buttons">
                <button onClick={() => startEdit(u)}>Edit</button>
                <button onClick={() => remove(u.id)}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
