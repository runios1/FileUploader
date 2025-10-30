import { useState } from "react";
import ModalDialog from "../../../ModalDialog/ModalDialog";

export default function Properties({ directory }) {
  const [showPropertiesModal, setShowPropertiesModal] = useState(false);

  function toggleDeleteModal(e) {
    e.preventDefault();
    setShowPropertiesModal(!showPropertiesModal);
  }

  return (
    <>
      <button onClick={(e) => toggleDeleteModal(e)}>Properties</button>
      <ModalDialog
        showModal={showPropertiesModal}
        setShowModal={setShowPropertiesModal}
      >
        <h3>{directory.name}</h3>
        <p>Location: {directory.path}</p>
        <b>Creation Time: {directory.created}</b>
      </ModalDialog>
    </>
  );
}
