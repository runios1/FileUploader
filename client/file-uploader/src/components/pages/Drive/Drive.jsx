import { Link } from "react-router";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Drive() {
  const { "*": dirPath } = useParams();
  const [directory, setDirectory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    fetch(`http://localHost:3000/drive/${dirPath || "root"}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Server error.");
        return response.json();
      })
      .then((data) => {
        if (!data.directory) {
          throw new Error("This directory does not exist.");
        }
        setDirectory(data.directory);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [dirPath]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {directory.parent && (
        <Link to={"/drive/" + directory.parent.path}>Up</Link>
      )}
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
            </li>
          ))}
        </ul>
      ) : (
        <p> This directory is empty</p>
      )}
    </div>
  );
}
