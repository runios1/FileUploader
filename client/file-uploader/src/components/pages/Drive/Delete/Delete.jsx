import { useState } from "react";
import ModalDialog from "../../../ModalDialog/ModalDialog";

export default function Delete({ directory, onDeleted }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function toggleDeleteModal(e) {
    e.preventDefault();
    setShowDeleteModal(!showDeleteModal);
  }

  async function handleDelete(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/drive/${directory.id}`,
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

      setShowDeleteModal(false);
      if (onDeleted) onDeleted();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button onClick={(e) => toggleDeleteModal(e)}>Delete</button>
      <ModalDialog
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
      >
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <>
            <p>Are you sure you want to delete {directory.name}</p>
            <div>
              <button onClick={(e) => handleDelete(e)}>Delete</button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowDeleteModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </ModalDialog>
    </>
  );
}
