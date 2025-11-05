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
        `https://fileuploader-85br.onrender.com/drive/${dirPath || "root"}`,
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

  async function loadFile(e, dirName) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(
        `https://fileuploader-85br.onrender.com/drive/file/${dirPath}/${dirName}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (response.status === 401)
        throw new Error("You must be logged in to download this file.");
      if (!response.ok) throw new Error("Server error.");
      const data = await response.json();
      if (!data.url) throw new Error("Server did not serve a file url.");
      window.open(data.url, "_blank"); //Open file in new tab
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
        <Add onAdded={loadDirectory} />
      </div>
      {directory.contents && directory.contents.length > 0 ? (
        <ul>
          {directory.contents.map((dir) => (
            <li key={dir.id}>
              <div>
                {dir.Type === "Folder" ? (
                  <Link to={"/drive/" + dir.path}>{dir.name}</Link>
                ) : (
                  <a href="#" onClick={(e) => loadFile(e, dir.name)}>
                    {dir.name}
                  </a>
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
