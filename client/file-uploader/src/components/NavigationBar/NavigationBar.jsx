import { Link } from "react-router-dom";
import Logout from "../Logout/Logout";
import useAuth from "../../hooks/useAuth";
import { useContext } from "react";
import { AuthContext } from "../../contexts";

export default function NavigationBar() {
  const { loading } = useAuth();
  const { isAuthenticated } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;
  return (
    <nav>
      <Link to="/">Home</Link>
      {isAuthenticated ? (
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
