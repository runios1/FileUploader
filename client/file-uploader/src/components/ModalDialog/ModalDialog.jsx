import { useEffect, useRef } from "react";
export default function ModalDialog({ showModal, setShowModal, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (dialogRef.current.open && !showModal) {
      dialogRef.current.close();
    } else if (!dialogRef.current.open && showModal) {
      dialogRef.current.showModal();
    }
  }, [showModal]);

  return (
    <dialog ref={dialogRef}>
      <button
        onClick={(e) => {
          e.preventDefault();
          setShowModal(false);
        }}
      >
        X
      </button>
      {children}
    </dialog>
  );
}
