import React from "react";

import Modal from "react-modal";

const SimpleModal = (props) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -45%)",
      border: "none",
      background: "#fff",
      padding: "1.5rem",
      width: "30vw",
      justifyContent: "center",
      boxShadow:
        "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,.3)",
    },
  };
  return (
    <Modal
      shouldCloseOnOverlayClick
      isOpen={props.modal}
      onRequestClose={props.close}
      style={customStyles}
      ariaHideApp={false}
    >
      {props.contents}
    </Modal>
  );
};

export default SimpleModal;
