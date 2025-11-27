import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import Add from "./Add/Add";
import DeleteModal from "./Delete/DeleteModal";
import PropertiesModal from "./Properties/PropertiesModal";
import { ArrowUp, File, Folder, FolderOpen, Info, Trash2 } from "lucide-react";
import styles from "./Drive.module.css";

export default function Drive() {
  const { "*": dirPath } = useParams();
  const [directory, setDirectory] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPropertiesModal, setShowPropertiesModal] = useState(false);

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

  return (
    <div className={styles.drivePage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.pathDisplay}>
            <FolderOpen className={styles.pathIcon} />
            <span className={styles.path}>{dirPath || "Root"}</span>
          </div>
          <div className={styles.actions}>
            <Link
              to={"/drive/" + (directory.parent && directory.parent.path)}
              className={`${styles.actionButton} ${
                !directory.parent ? styles.disabled : ""
              }`}
              onClick={(e) => !directory.parent && e.preventDefault()}
              aria-disabled={!directory.parent}
              aria-label="Go up one level"
            >
              <ArrowUp size={20} />
              <span className={styles.buttonText}>Up</span>
            </Link>
          </div>
        </div>

        <Add onAdded={loadDirectory} />

        {error && (
          <div className={styles.errorState}>
            <h3 className={styles.errorTitle}>Error</h3>
            <p className={styles.errorMessage}>{error.message}</p>
          </div>
        )}

        {loading && !error && (
          <div className={styles.loadingState}>
            <div className={styles.loadingSpinner}></div>
            <p className={styles.loadingText}>Loading...</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {directory.contents && directory.contents.length > 0 ? (
              <div className={styles.itemsGrid}>
                {directory.contents.map((dir) => (
                  <>
                    <div key={dir.id} className={styles.itemCard}>
                      {dir.Type === "Folder" ? (
                        <Link
                          to={"/drive/" + dir.path}
                          className={styles.itemLink}
                        >
                          <div className={styles.itemIcon}>
                            <Folder size={32} />
                          </div>
                          <div className={styles.itemName}>{dir.name}</div>
                        </Link>
                      ) : (
                        <a
                          href="#"
                          onClick={(e) => loadFile(e, dir.name)}
                          className={styles.itemLink}
                        >
                          <div className={styles.itemIcon}>
                            <File size={32} />
                          </div>
                          <div className={styles.itemName}>{dir.name}</div>
                        </a>
                      )}

                      <div className={styles.itemActions}>
                        <button
                          onClick={() => setShowPropertiesModal(true)}
                          className={styles.itemButton}
                          aria-label={`Properties of ${dir.name}`}
                        >
                          <Info size={16} />
                        </button>
                        <button
                          onClick={() => setShowDeleteModal(true)}
                          className={styles.itemButtonDelete}
                          aria-label={`Delete ${dir.name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <PropertiesModal
                      directory={dir}
                      showModal={showPropertiesModal}
                      setShowModal={setShowPropertiesModal}
                    />
                    <DeleteModal
                      directory={dir}
                      onDeleted={loadDirectory}
                      showModal={showDeleteModal}
                      setShowModal={setShowDeleteModal}
                    />
                  </>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <Folder size={64} className={styles.emptyIcon} />
                <p className={styles.emptyText}>This folder is empty</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
