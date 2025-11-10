import { useState } from "react";
import ModalDialog from "../../../ModalDialog/ModalDialog";
import styles from "./DeleteModal.module.css";

export default function Delete({
  directory,
  onDeleted,
  showModal,
  setShowModal,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleDelete() {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        `https://fileuploader-85br.onrender.com/drive/${directory.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Server error.");
      }

      setShowModal(false);
      if (onDeleted) onDeleted();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ModalDialog
        showModal={showModal}
        setShowModal={setShowModal}
        title="Delete"
      >
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div className={styles.deleteContent}>
            <p className={styles.deleteWarning}>
              Are you sure you want to delete <strong>{directory.name}</strong>?
              {directory.Type === "Folder" &&
                " All contents will be permanently deleted."}
            </p>
            <div className={styles.modalActions}>
              <button
                onClick={() => setShowModal(false)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
              <button onClick={handleDelete} className={styles.deleteButton}>
                Delete
              </button>
            </div>
          </div>
        )}
      </ModalDialog>
    </>
  );
}
