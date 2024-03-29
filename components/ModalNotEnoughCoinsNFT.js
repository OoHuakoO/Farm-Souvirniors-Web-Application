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
      
      <Modal.Header className={styles.popupBg1}>
      <div >{props.headerText}</div>
        <div className={styles.modalclose} onClick={() => handleClose()}>
         
          <div className="material-icons">close</div>
        </div>
      </Modal.Header>

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
