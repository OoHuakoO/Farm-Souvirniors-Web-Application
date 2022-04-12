import React, { useState } from "react";
import styles from "../styles/MyItem.module.css";
import Image from "next/image";
import { sellNFTAPI } from "../api/marketplace";
import { sellNFTWeb3 } from "../web3/nft";
import { sellNFTWeb3InstanceRandombox } from "../web3/randomBox";
import { Modal } from "react-bootstrap";
import { useRouter } from "next/router";
const ModalSellNFT = (props) => {
  const router = useRouter();
  const handleClose = () => props.setShowPopupSellNFT(false);
  const [priceNFT, setPriceNFT] = useState();
  const sellNFT = async (item) => {
    if (item.from === "nft") {
      const responseWeb3 = await sellNFTWeb3(
        props.share_address_wallet,
        item.indexNFT,
        priceNFT
      );
      if (responseWeb3) {
        const responseAPI = await sellNFTAPI(priceNFT, item.nft_id);
        console.log(responseAPI);
        router.push({
          pathname: "/Sell",
        });
      }
    } else if (item.from === "randombox") {
      const responseWeb3InstanceRandombox = await sellNFTWeb3InstanceRandombox(
        props.share_address_wallet,
        item.indexNFT,
        priceNFT
      );
      if (responseWeb3InstanceRandombox) {
        const responseAPI = await sellNFTAPI(priceNFT, item.nft_id);
        console.log(responseAPI);
        router.push({
          pathname: "/Sell",
        });
      }
    }
  };
  const sellRandombox = async (item) => {
    const response = await sellNFTWeb3InstanceRandombox(
      props.share_address_wallet,
      item.indexNFT,
      priceNFT
    );
    router.push({
      pathname: "/Sell",
    });
    console.log(response);
  };

  return (
    <Modal
      show={props.showPopupSellNFT}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="lg"
    >
      <Modal.Header className={styles.popupBg} closeButton></Modal.Header>
      <Modal.Body className={styles.popupBg}>
        <div className={styles.cardMyItem1Popup}>
          <div className={styles.cardMyItem2Popup}>
            {/* <div onClick={() => setshowModal(true)} className={styles.cardMyItem6} > */}
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
          <div>{props.item.name}</div>
          <div>Price</div>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              onChange={(event) => setPriceNFT(event.target.value)}
            />
          </div>
          
          {props.item.type_nft === "chest" ? (
            <div
              onClick={() => sellRandombox(props.item)}
              className={styles.buttonSellPopup}
            >
              Sell
            </div>
          ) : (
            <div
              onClick={() => sellNFT(props.item)}
              className={styles.buttonSellPopup}
            >
              Sell
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalSellNFT;
