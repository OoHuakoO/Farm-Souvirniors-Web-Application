import React from "react";
import styles from "../styles/MyItem.module.css";
import Image from "next/image";
import { Modal } from "react-bootstrap";
const ModalOpenBuyChests = (props) => {
  const handleClose = () => props.setShowPopupOpenBuyChests(false);
  return (
    <Modal
      show={props.showPopupOpenBuyChests}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className={styles.popupBg1}>
      <div >Detail</div>
        <div className={styles.modalclose} onClick={() => handleClose()}>
         
          <div className="material-icons">close</div>
        </div>
      </Modal.Header>
      <Modal.Body className={styles.popupBg}>
        <div className={styles.cardMyItem1PopupOpen}>
          <div className={styles.cardMyItem2PopupOpen}>
            <div className={styles.uidCard}>
              <span>UID : </span>
              <span>{props.detailNFTOpenBox.pid}</span>
            </div>
            <div className={styles.youGotThis}>You got this !!!</div>
            <div className={styles.imageMyItemPopup}>
              <Image
                src={props.detailNFTOpenBox.picture}
                alt="Corn"
                width={200}
                height={200}
              />
            </div>
          </div>
          <div className={styles.NameCardPopup}>
            <span>{props.detailNFTOpenBox.name}</span>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalOpenBuyChests;
