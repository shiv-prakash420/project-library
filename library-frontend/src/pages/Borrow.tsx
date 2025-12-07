import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import "../styles.css";

export default function Borrow() {
  const [users, setUsers] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [borrowed, setBorrowed] = useState<any[]>([]);
  const [userId, setUserId] = useState("");
  const [bookId, setBookId] = useState("");

  const load = useCallback(async () => {
    const resUsers = await api.get("/users");
    const resBooks = await api.get("/books");
    setUsers(resUsers.data);
    setBooks(resBooks.data);
  }, []);

  // FIX #1 — useCallback so React and ESLint accept it
  const loadBorrowed = useCallback(async () => {
    if (!userId) return; // prevents API call before user selected
    const res = await api.get(`/borrow/user/${userId}`);
    setBorrowed(res.data);
  }, [userId]);

  const borrow = async () => {
    await api.post("/borrow", {
      userId: Number(userId),
      bookId: Number(bookId),
    });
    loadBorrowed(); // will re-run correctly
  };

  const returnBook = async (id: number) => {
    await api.post(`/borrow/return/${id}`);
    loadBorrowed();
  };

  // load users + books once
  useEffect(() => {
    load();
  }, [load]);

  // whenever user changes, load their borrowed books
  useEffect(() => {
    loadBorrowed();
  }, [loadBorrowed]);

  return (
    <div className="page-container">
      <h2>Borrow / Return</h2>

      {/* USER SELECT */}
      <div className="form-row">
        <select value={userId} onChange={(e) => setUserId(e.target.value)}>
          <option value="">Select User</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>

        {/* BOOK SELECT */}
        <select value={bookId} onChange={(e) => setBookId(e.target.value)}>
          <option value="">Select Book</option>
          {books.map((b) => (
            <option key={b.id} value={b.id}>{b.title}</option>
          ))}
        </select>

        <button onClick={borrow}>Borrow</button>
      </div>

      {/* BORROWED LIST */}
      <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>Borrowed Books</h3>

      {borrowed.map((b) => (
        <div className="list-item" key={b.id}>
          <span>{b.book.title}</span>
          <div className="action-buttons">
            <button onClick={() => returnBook(b.id)}>Return</button>
          </div>
        </div>
      ))}
    </div>
  );
}
