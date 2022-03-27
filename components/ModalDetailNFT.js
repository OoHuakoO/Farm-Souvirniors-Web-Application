import React from "react";
import styles from "../styles/MyItem.module.css";
import Image from "next/image";
import { Modal } from "react-bootstrap";
const ModalDetailNFT = (props) => {
  const handleClose = () => props.setShowPopupDetailNFT(false);
  return (
    <Modal
      show={props.showPopupDetailNFT}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="lg"
    >
      <Modal.Header className={styles.popupBg} closeButton></Modal.Header>
      <Modal.Body className={styles.popupBg}>
        <div className={styles.cardMyItem1Popup}>
          <div className={styles.cardMyItem2Popup}>
            <div className={styles.imageMyItemPopup}>
              <Image
                src={props.item.picture}
                alt="Corn"
                width={200}
                height={200}
              />
            </div>
          </div>
          <div className={styles.NameCardPopup}>
            <span>{props.item.name}</span>
          </div>
        </div>
        <div className={styles.detailPopup}>
          <div>Reward : {props.item.reward} meat</div>
          <div>Energy Consumed : {props.item.energy_consumed} meat</div>
          <div>Amount Food: {props.item.amount_food} fruit</div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalDetailNFT;
