import { Link } from "react-router-dom";
import Logout from "../Logout/Logout";
import useAuth from "../../hooks/useAuth";
import { useContext } from "react";
import { AuthContext } from "../../contexts";
import styles from "./NavigationBar.module.css";
import { Moon, Sun } from "lucide-react";

export default function NavigationBar({ onToggleDarkMode, isDarkMode }) {
  const { loading } = useAuth();
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          <div className={styles.leftSection}>
            <Link to="/" className={styles.logo}>
              FileUploader
            </Link>
            {loading ? (
              <div className={styles.loadingText}>Loading...</div>
            ) : (
              <div className={styles.navLinks}>
                <Link to="/" className={styles.navLink}>
                  Home
                </Link>
                {isAuthenticated ? (
                  <>
                    <Link to="/drive/root" className={styles.navLink}>
                      Drive
                    </Link>
                    <Logout className={styles.navLink}>Logout</Logout>
                  </>
                ) : (
                  <>
                    <Link to="/login" className={styles.navLink}>
                      Login
                    </Link>
                    <Link to="/register" className={styles.navLink}>
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
          <div className={styles.rightSection}>
            <button
              onClick={onToggleDarkMode}
              className={styles.darkModeToggle}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
