import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      auth.setToken(res.data.token);
      navigate("/authors");
    } catch {
      alert("Invalid login");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Library Admin Login</h2>

      <input 
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input 
        placeholder="Password" 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="login-btn" onClick={login}>
        Login
      </button>
    </div>
  );
}
