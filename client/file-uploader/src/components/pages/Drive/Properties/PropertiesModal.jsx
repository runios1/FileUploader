import ModalDialog from "../../../ModalDialog/ModalDialog";
import styles from "./PropertiesModal.module.css";

export default function PropertiesModal({
  directory,
  showModal,
  setShowModal,
}) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
  }

  return (
    <ModalDialog
      showModal={showModal}
      setShowModal={setShowModal}
      title="Properties"
    >
      <div className={styles.propertiesContent}>
        <div className={styles.propertyRow}>
          <span className={styles.propertyLabel}>Name:</span>
          <span className={styles.propertyValue}>{directory.name}</span>
        </div>
        <div className={styles.propertyRow}>
          <span className={styles.propertyLabel}>Path:</span>
          <span className={styles.propertyValue}>{directory.path}</span>
        </div>
        <div className={styles.propertyRow}>
          <span className={styles.propertyLabel}>Type:</span>
          <span className={styles.propertyValue}>{directory.Type}</span>
        </div>
        <div className={styles.propertyRow}>
          <span className={styles.propertyLabel}>Created:</span>
          <span className={styles.propertyValue}>
            {formatDate(directory.created)}
          </span>
        </div>
      </div>
    </ModalDialog>
  );
}
