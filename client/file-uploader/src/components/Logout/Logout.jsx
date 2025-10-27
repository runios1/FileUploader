import { useNavigate } from "react-router-dom";

export default function Logout({ children }) {
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();

    fetch("http://localhost:3000/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((response) => {
      if (response.ok) {
        localStorage.removeItem("userEmail");
        navigate("/");
        window.location.reload(); // If the user is in the home page refreshes the page to show the updated page
      } else {
        throw new Error("Could not log out.");
      }
    });
  }
  return (
    <a href="#" onClick={(e) => handleClick(e)}>
      {children}
    </a>
  );
}
