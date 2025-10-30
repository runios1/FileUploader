import { Outlet } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { useState } from "react";
import { AuthContext } from "./contexts";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <>
      <AuthContext value={{ isAuthenticated, setIsAuthenticated }}>
        <NavigationBar />
        <main>
          <Outlet />
        </main>
      </AuthContext>
    </>
  );
}
