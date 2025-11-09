import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import styles from "./Register.module.css";

export default function Register() {
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setLoading(true);
    setError(null);
    fetch("https://fileuploader-85br.onrender.com/users/register", {
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
    <div className={styles.registerPage}>
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <div className={styles.formBox}>
            <div className={styles.decorativeShape1} />
            <div className={styles.decorativeShape2} />
            <div className={styles.decorativeShape3} />

            <div className={styles.formContent}>
              <h1 className={styles.title}>Register</h1>
              <p className={styles.subtitle}>Create your account</p>

              {error && Array.isArray(error) ? (
                <div className={styles.errorBox}>
                  <div className={styles.errorIndicator} />
                  <ul className="errors">
                    {error.map((err, index) => (
                      <li key={index} className="error">
                        <p className={styles.errorText}>{err.msg}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                error && (
                  <div className={styles.errorBox}>
                    <div className={styles.errorIndicator} />
                    <p className={styles.errorText}>{error.message}</p>
                  </div>
                )
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
                    required
                    autoComplete="email"
                    maxLength={255}
                    disabled={loading}
                    className={styles.input}
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
                    required
                    maxLength={255}
                    disabled={loading}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="confirm" className={styles.label}>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirm"
                    name="confirm"
                    required
                    disabled={loading}
                    className={styles.input}
                  />
                </div>

                <button type="submit" className={styles.submitButton}>
                  {loading ? "Creating Account..." : "Register"}
                </button>
              </form>

              <div className={styles.footer}>
                <p className={styles.footerText}>
                  Already have an account?{" "}
                  <Link to="/login" className={styles.link}>
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <>
    //   {loading && <p>Loading in progress</p>}
    //   {error && Array.isArray(error) ? (
    //     <ul className="errors">
    //       {error.map((err, index) => (
    //         <li key={index} className="error">
    //           {err.msg}
    //         </li>
    //       ))}
    //     </ul>
    //   ) : error ? (
    //     <p className="error">{error.message}</p>
    //   ) : null}{" "}
    //   <form
    //     onSubmit={(e) => {
    //       handleSubmit(e);
    //     }}
    //   >
    //     <label htmlFor="email">Email</label>
    //     <input
    //       type="email"
    //       name="email"
    //       id="email"
    //       required
    //       autoComplete="email"
    //       maxLength={255}
    //     />
    //     <label htmlFor="password">Password</label>
    //     <input
    //       type="password"
    //       name="password"
    //       id="password"
    //       required
    //       maxLength={255}
    //     />
    //     <label htmlFor="confirm">Confirm Password</label>
    //     <input type="password" name="confirm" id="confirm" required />
    //     <button type="submit">Register</button>
    //   </form>
    // </>
  );
}
