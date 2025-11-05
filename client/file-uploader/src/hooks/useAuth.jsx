import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts";

export default function useAuth() {
  const [loading, setLoading] = useState(true);
  const { setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://fileuploader-85br.onrender.com/users/auth",
          {
            credentials: "include",
          }
        );
        if (!res.ok) throw new Error("Not authenticated.");
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { loading };
}
