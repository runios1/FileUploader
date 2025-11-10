import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import styles from "./ModalDialog.module.css";

export default function ModalDialog({
  showModal,
  setShowModal,
  title,
  children,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (dialogRef.current.open && !showModal) {
      dialogRef.current.close();
    } else if (!dialogRef.current.open && showModal) {
      dialogRef.current.showModal();
    }
  }, [showModal]);

  function handleBackdropClick(e) {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;

    if (!isInDialog) {
      setShowModal(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClick={handleBackdropClick}
      onClose={() => setShowModal(false)}
    >
      <div className={styles.dialogContent}>
        <div className={styles.dialogHeader}>
          <h2 className={styles.dialogTitle}>{title}</h2>
          <button
            onClick={() => setShowModal(false)}
            className={styles.closeButton}
          >
            <X size={24} />
          </button>
        </div>
        <div className={styles.dialogBody}>{children}</div>
      </div>
    </dialog>
  );
}
