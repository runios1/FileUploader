import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts";

export default function Logout({ children }) {
  const navigate = useNavigate();

  const { setIsAuthenticated } = useContext(AuthContext);

  function handleClick(e) {
    e.preventDefault();

    try {
      fetch("http://localhost:3000/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }).then((response) => {
        if (!response.ok) throw new Error("Could not log out.");

        setIsAuthenticated(false);
        navigate("/");
      });
    } catch (err) {
      console.error("Logout error:" + err);
      alert("Could not log out.");
    }
  }
  return (
    <a href="#" onClick={(e) => handleClick(e)}>
      {children}
    </a>
  );
}
