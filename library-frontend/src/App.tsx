import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Authors from "./pages/Authors";
import Books from "./pages/Books";
import Users from "./pages/Users";
import Borrow from "./pages/Borrow";
import { Protected } from "./auth/Protected";
import Navbar from "./components/Navbar";




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* <Route path="/authors" element={<Protected><><Navbar /><Authors/></></Protected>} /> */}
        <Route path="/books" element={<Protected><><Navbar /><Books/></></Protected>} />
        <Route path="/users" element={<Protected><><Navbar /><Users/></></Protected>} />
        <Route path="/borrow" element={<Protected><><Navbar /><Borrow/></></Protected>} />
        <Route path="/authors" element={<Protected><><Navbar /><Authors /></></Protected>}/>
      </Routes>
    </BrowserRouter>
  );
}
