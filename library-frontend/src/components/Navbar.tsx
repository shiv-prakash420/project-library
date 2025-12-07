import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import "./navbar.css";

export default function Navbar() {
  const auth = useAuth();

  return (
    <nav className="nav-container">
      <div className="nav-left">
        <span className="nav-logo">Library Admin</span>

        <Link className="nav-link" to="/authors">Authors</Link>
        <Link className="nav-link" to="/books">Books</Link>
        <Link className="nav-link" to="/users">Users</Link>
        <Link className="nav-link" to="/borrow">Borrow</Link>
      </div>

      <div className="nav-right">
        <button className="logout-btn" onClick={auth.logout}>Logout</button>
      </div>
    </nav>
  );
}
