import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setLoading(true);
    setError(null);
    fetch("http://localhost:3000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
        confirm: formData.get("confirm"),
      }),
    })
      .then(async (response) => {
        if (response.status >= 500) {
          throw new Error("Server error, please try again later.");
        }

        const data = await response.json();

        if (response.status >= 400) {
          setError(data.errors);
          return;
        }

        navigate("/login");
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }
  return (
    <>
      {loading && <p>Loading in progress</p>}
      {error && Array.isArray(error) ? (
        <ul className="errors">
          {error.map((err, index) => (
            <li key={index} className="error">
              {err.msg}
            </li>
          ))}
        </ul>
      ) : error ? (
        <p className="error">{error.message}</p>
      ) : null}{" "}
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          autoComplete="email"
          maxLength={255}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          maxLength={255}
        />
        <label htmlFor="confirm">Confirm Password</label>
        <input type="password" name="confirm" id="confirm" required />
        <button type="submit">Register</button>
      </form>
    </>
  );
}
