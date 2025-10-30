import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import Add from "./Add/Add";
import Delete from "./Delete/Delete";
import Properties from "./Properties/Properties";

export default function Drive() {
  const { "*": dirPath } = useParams();
  const [directory, setDirectory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loadDirectory() {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/drive/${dirPath || "root"}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (response.status === 401)
        throw new Error("You must be logged in to see this page.");
      if (!response.ok) throw new Error("Server error.");
      const data = await response.json();
      if (!data.directory) throw new Error("This directory does not exist.");
      setDirectory(data.directory);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDirectory();
  }, [dirPath]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div>
        {directory.parent && (
          <Link to={"/drive/" + directory.parent.path}>Up</Link>
        )}
        <Add />
      </div>
      {directory.contents && directory.contents.length > 0 ? (
        <ul>
          {directory.contents.map((dir) => (
            <li key={dir.id}>
              <div>
                {dir.Type === "Folder" ? (
                  <Link to={"/drive/" + dir.path}>{dir.name}</Link>
                ) : (
                  <a href={dir.downloadLink}>{dir.name}</a>
                )}
              </div>
              <div>
                <Delete directory={dir} onDeleted={loadDirectory} />
                <Properties directory={dir} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p> This directory is empty</p>
      )}
    </div>
  );
}
