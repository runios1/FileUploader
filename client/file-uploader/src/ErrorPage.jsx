import { Link } from "react-router";
import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.container}>
        <div className={styles.decorativeShape1} />
        <div className={styles.decorativeShape2} />
        <div className={styles.decorativeShape3} />

        <div className={styles.content}>
          <h1 className={styles.errorCode}>404</h1>
          <h2 className={styles.errorTitle}>Page Not Found</h2>
          <p className={styles.errorMessage}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className={styles.homeButton}>
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
