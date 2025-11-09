import { Outlet } from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { useState, useEffect } from "react";
import { AuthContext } from "./contexts";
import styles from "./App.module.css";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  function onToggleDarkMode() {
    setIsDarkMode(!isDarkMode);
  }

  useEffect(() => {
    setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  return (
    <div className={`${styles.app} ${isDarkMode ? "dark" : ""}`}>
      <AuthContext value={{ isAuthenticated, setIsAuthenticated }}>
        <NavigationBar
          onToggleDarkMode={onToggleDarkMode}
          isDarkMode={isDarkMode}
        />
        <main>
          <Outlet />
        </main>
      </AuthContext>
    </div>
  );
}
