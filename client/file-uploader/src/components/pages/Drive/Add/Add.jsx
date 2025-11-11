import { Activity, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Plus, File, Folder, X } from "lucide-react";
import styles from "./Add.module.css";

export default function Add({ onAdded }) {
  const { "*": dirPath } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  function handleAdd(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    setError(null);
    setLoading(true);

    fetch(
      `https://fileuploader-85br.onrender.com/drive/add/${dirPath || "root"}`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    )
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.errors[0].msg);
        if (!data.newDirectory)
          throw new Error("Server error, didn't return a directory.");
        if (!formData.get("file")) navigate("/drive/" + data.newDirectory.path);
        else if (onAdded) onAdded();

        setIsShowingTypeChoice(false);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }

  const [isShowingTypeChoice, setIsShowingTypeChoice] = useState(false);
  const [isShowingFileForm, setIsShowingFileForm] = useState(false);
  const [isShowingFolderForm, setIsShowingFolderForm] = useState(false);

  return (
    <div className={styles.addContainer}>
      <button
        onClick={() => setIsShowingTypeChoice(!isShowingTypeChoice)}
        className={styles.addButton}
      >
        <Plus size={20} />
        <span>Add</span>
      </button>

      <Activity mode={isShowingTypeChoice ? "visible" : "hidden"}>
        <div className={styles.menu}>
          <button
            onClick={() => {
              setIsShowingFileForm(true);
              setIsShowingFolderForm(false);
            }}
            className={styles.menuButton}
          >
            <File size={20} />
            <span>File</span>
          </button>
          <button
            onClick={() => {
              setIsShowingFolderForm(true);
              setIsShowingFileForm(false);
            }}
            className={styles.menuButton}
          >
            <Folder size={20} />
            <span>Folder</span>
          </button>
        </div>

        <Activity mode={isShowingFileForm ? "visible" : "hidden"}>
          <div className={styles.formBox}>
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>Upload File</h3>
              <button
                onClick={() => setIsShowingFileForm(false)}
                className={styles.closeButton}
              >
                <X size={20} />
              </button>
            </div>

            {error && (
              <div className={styles.errorBox}>
                <div className={styles.errorIndicator} />
                <p className={styles.errorText}>{String(error)}</p>
              </div>
            )}

            <form onSubmit={(e) => handleAdd(e)} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  maxLength={255}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="file" className={styles.label}>
                  File
                </label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  required
                  className={styles.fileInput}
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Upload
              </button>
            </form>
          </div>
        </Activity>

        <Activity mode={isShowingFolderForm ? "visible" : "hidden"}>
          <div className={styles.formBox}>
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>Create Folder</h3>
              <button
                onClick={() => setIsShowingFolderForm(false)}
                className={styles.closeButton}
              >
                <X size={20} />
              </button>
            </div>

            {error && (
              <div className={styles.errorBox}>
                <div className={styles.errorIndicator} />
                <p className={styles.errorText}>{String(error)}</p>
              </div>
            )}

            <form onSubmit={(e) => handleAdd(e)} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  maxLength={255}
                  className={styles.input}
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                {loading ? "Creating..." : "Create"}
              </button>
            </form>
          </div>
        </Activity>
      </Activity>
    </div>
  );
}
