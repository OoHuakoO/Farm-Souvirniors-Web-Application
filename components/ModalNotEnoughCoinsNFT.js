import React from "react";
import styles from "../styles/MyItem.module.css";
import { Modal, Button } from "react-bootstrap";
const ModalNotEnoughCoinsNFT = (props) => {
  const handleClose = () => props.setShowPopupNotEnoughCoinsNFT(false);
  return (
    <Modal
      show={props.showPopupNotEnoughCoinsNFT}
      onHide={() => handleClose()}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>{props.headerText}</Modal.Header>

      <Modal.Body>
        <p>{props.bodyText}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button
          onClick={() => handleClose()}
          variant="secondary"
          className={styles.buttonPopupNotenoughCoin}
        >
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalNotEnoughCoinsNFT;
