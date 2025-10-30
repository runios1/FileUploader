import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts";

export default function Login() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setIsAuthenticated } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setLoading(true);
    setError(null);
    fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    })
      .then(async (response) => {
        if (response.status >= 500) {
          throw new Error("Server error, please try again later.");
        }

        const data = await response.json();

        if (response.status >= 400) {
          throw new Error(data.msg);
        }

        setIsAuthenticated(true);

        navigate("/drive/root");
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }
  return (
    <>
      {loading && <p>Loading in progress</p>}
      {error ? <p className="error">{error.message}</p> : null}{" "}
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
