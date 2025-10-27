import { Link } from "react-router-dom";
import Logout from "../Logout/Logout";

export default function NavigationBar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      {localStorage.getItem("userEmail") ? (
        <>
          <Link to="/drive/root">Drive</Link>
          <Logout>Logout</Logout>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
