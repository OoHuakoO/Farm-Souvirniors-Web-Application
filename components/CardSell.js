import React, { useState, useEffect } from "react";
import styles from "../styles/MyItem.module.css";
import Image from "next/image";
import { cancleNFTAPI } from "../api/marketplace";
import { cancleNFTWeb3 } from "../web3/nft";
import { cancleNFTWeb3InstanceRandombox } from "../web3/randomBox";
import { useRouter } from "next/router";
import { Modal, Button } from "react-bootstrap";
const CardSell = (props) => {
  const router = useRouter();
  const cancleSell = async (item) => {
    if (item.from === "nft") {
      const responseWeb3 = await cancleNFTWeb3(
        props.share_address_wallet,
        item.indexNFT
      );
      if (responseWeb3) {
        const responseAPI = await cancleNFTAPI(item.nft_id);
        console.log(responseAPI);
        router.push({
          pathname: "/MyItem",
        });
      }
    } else if (item.from === "randombox") {
      const responseWeb3InstanceRandombox =
        await cancleNFTWeb3InstanceRandombox(
          props.share_address_wallet,
          item.indexNFT
        );
      if (responseWeb3InstanceRandombox) {
        const responseAPI = await cancleNFTAPI(item.nft_id);
        console.log(responseAPI);
        router.push({
          pathname: "/MyItem",
        });
      }
    }
  };
  const handleCancleRandomBox = async (item) => {
    const response = await cancleNFTWeb3InstanceRandombox(
      props.share_address_wallet,
      item.indexNFT
    );
    console.log(response);
    router.push({
      pathname: "/MyItem",
    });
  };
  const [showPopup, setShowPopup] = useState(false);
  const handleClose = () => setShowPopup(false);
  const handleShow = () => setShowPopup(true);
  return (
    <div className={styles.cardMyItem1}>
      <div className={styles.cardMyItem2} onClick={handleShow}>
        <div className={styles.uidCard}>
          <span>UID : </span>
          <span>{props.nft_id}</span>
        </div>
        <div className={styles.imageMyItem}>
          <Image src={props.picture} alt="Corn" width={200} height={200} />
        </div>
      </div>
      <div className={styles.NameCard}>
        <span>{props.name}</span>
      </div>
      {props.type_nft === "chest" ? (
        <div
          onClick={() => handleCancleRandomBox(props)}
          className={styles.buttonCancleSell}
        >
          <span>Cancle Sell</span>
        </div>
      ) : (
        <div
          onClick={() => cancleSell(props)}
          className={styles.buttonCancleSell}
        >
          <span>Cancle Sell</span>
        </div>
      )}
      <Modal
        show={showPopup}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CardSell;
