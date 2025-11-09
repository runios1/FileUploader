import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts";
import styles from "./Login.module.css";

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
    fetch("https://fileuploader-85br.onrender.com/users/login", {
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
    <div className={styles.loginPage}>
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <div className={styles.formBox}>
            <div className={styles.decorativeShape1} />
            <div className={styles.decorativeShape2} />

            <div className={styles.formContent}>
              <h1 className={styles.title}>Login</h1>
              <p className={styles.subtitle}>Access your files</p>

              {error && (
                <div className={styles.errorBox}>
                  <div className={styles.errorIndicator} />
                  <p className={styles.errorText}>{error.message}</p>
                </div>
              )}

              <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={styles.input}
                    disabled={loading}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="password" className={styles.label}>
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={styles.input}
                    disabled={loading}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Login"}
                </button>
              </form>

              <div className={styles.footer}>
                <p className={styles.footerText}>
                  Don't have an account?{" "}
                  <Link to="/register" className={styles.link}>
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
