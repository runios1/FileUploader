import { Activity, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function Add() {
  const { "*": dirPath } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  function handleAdd(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    setError(null);
    setLoading(true);

    fetch(`http://localhost:3000/drive/add/${dirPath || "root"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: formData.get("name"),
        file: formData.get("file"),
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Server error.");
        return response.json();
      })
      .then((data) => {
        if (!data.newDirectory)
          throw new Error("Server error, didn't return a directory.");
        navigate("/drive/" + data.newDirectory.path);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }

  const [isShowingTypeChoice, setIsShowingTypeChoice] = useState(false);
  const [isShowingFileForm, setIsShowingFileForm] = useState(false);
  const [isShowingFolderForm, setIsShowingFolderForm] = useState(false);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <button onClick={() => setIsShowingTypeChoice(!isShowingTypeChoice)}>
        Add
      </button>
      <Activity mode={isShowingTypeChoice ? "visible" : "hidden"}>
        <div>
          <button
            onClick={() => {
              setIsShowingFileForm(true);
              setIsShowingFolderForm(false);
            }}
          >
            File
          </button>
          <button
            onClick={() => {
              setIsShowingFolderForm(true);
              setIsShowingFileForm(false);
            }}
          >
            Folder
          </button>
        </div>

        <div>
          <Activity mode={isShowingFileForm ? "visible" : "hidden"}>
            <form onSubmit={(e) => handleAdd(e)}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                maxLength={255}
              />
              <label htmlFor="file">File</label>
              <input type="file" name="file" id="file" required />
              <button type="submit">Submit</button>
            </form>
          </Activity>
          <Activity mode={isShowingFolderForm ? "visible" : "hidden"}>
            <form onSubmit={(e) => handleAdd(e)}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                maxLength={255}
              />
              <button type="submit">Submit</button>
            </form>
          </Activity>
        </div>
      </Activity>
    </div>
  );
}
