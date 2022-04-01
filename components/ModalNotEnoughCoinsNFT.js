import React from "react";
import styles from "../styles/MyItem.module.css";
import Image from "next/image";
import { Modal, Button } from "react-bootstrap";
const ModalNotEnoughCoinsNFT = (props) => {
    console.log(props) 
    const handleClose = () => props.setShowPopupNotEnoughCoinsNFT(false);
    return (
      <Modal
        show={props.showPopupNotEnoughCoinsNFT}
        onHide={() => handleClose()}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
       <Modal.Header closeButton>
    
  </Modal.Header>

  <Modal.Body>
    <p>เหรียญของคุณไม่พอ กรุณาเติมเหรียญ</p>
  </Modal.Body>

  <Modal.Footer>
   
    <Button variant="secondary" className={styles.buttonPopupNotenoughCoin}>เติมเหรียญ</Button>
  </Modal.Footer>
      </Modal>
    );
  };
export default ModalNotEnoughCoinsNFT;
