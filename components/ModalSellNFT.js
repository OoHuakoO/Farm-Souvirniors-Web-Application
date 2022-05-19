import React, { useState } from "react";
import styles from "../styles/MyItem.module.css";
import Image from "next/image";
import { sellNFTAPI } from "../api/marketplace";
import { sellNFTWeb3 } from "../web3/nft";
import { sellNFTWeb3InstanceRandombox } from "../web3/randomBox";
import { Modal } from "react-bootstrap";
import { useRouter } from "next/router";
import binance from "../public/binance.png";
import ClipLoaderButton from "../components/ClipLoaderButton";
const ModalSellNFT = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleClose = () => props.setShowPopupSellNFT(false);
  const [priceNFT, setPriceNFT] = useState();
  const sellNFT = async (item) => {
    setLoading(true);
    if (item.from === "nft") {
      try {
        const responseWeb3 = await sellNFTWeb3(
          props.share_address_wallet,
          item.indexNFT,
          priceNFT
        );
        if (responseWeb3) {
          const responseAPI = await sellNFTAPI(priceNFT, item.nft_id);
          setLoading(false);
          console.log(responseAPI);
          router.push({
            pathname: "/Sell",
          });
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    } else if (item.from === "randombox") {
      try {
        const responseWeb3InstanceRandombox =
          await sellNFTWeb3InstanceRandombox(
            props.share_address_wallet,
            item.indexNFT,
            priceNFT
          );
        if (responseWeb3InstanceRandombox) {
          const responseAPI = await sellNFTAPI(priceNFT, item.nft_id);
          console.log(responseAPI);
          setLoading(false);
          router.push({
            pathname: "/Sell",
          });
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
  };
  const sellRandombox = async (item) => {
    setLoading(true);
    try {
      const response = await sellNFTWeb3InstanceRandombox(
        props.share_address_wallet,
        item.indexNFT,
        priceNFT
      );
      setLoading(false);
      router.push({
        pathname: "/Sell",
      });
      console.log(response);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <Modal
      show={props.showPopupSellNFT}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="lg"
    >
      <Modal.Header className={styles.popupBg1}>
        <div>Sell</div>
        <div className={styles.modalclose} onClick={() => handleClose()}>
          <div className="material-icons">close</div>
        </div>
      </Modal.Header>
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
            <span>{props.item.name[0].toUpperCase() + props.item.name.substring(1)}</span>
          </div>
        </div>
        <div className={styles.detailPopup1}>
          <div className={styles.detailReward}>{props.item.name[0].toUpperCase() + props.item.name.substring(1)}</div>
          <div>Price</div>
          <div className="input-group mb-3">
            <input
              // type="number"
              className="form-control"
              // inputMode="numeric"
              onChange={(event) => setPriceNFT(event.target.value)}
            />
          </div>
          <div className={styles.binanceBNB}>
            <div>BNB</div>&nbsp;&nbsp;
            <div className={styles.binanceBNB1}>
              <Image src={binance} alt="binance" width={20} height={20} />
            </div>
          </div>
          {props.item.type_nft === "chest" ? (
            loading ? (
              <div
                onClick={() => sellRandombox(props.item)}
                className={styles.buttonSellPopup}
              >
                <ClipLoaderButton loading={loading} color="white" />
              </div>
            ) : (
              <div
                onClick={() => sellRandombox(props.item)}
                className={styles.buttonSellPopup}
              >
                SELL
              </div>
            )
          ) : loading ? (
            <div
              onClick={() => sellNFT(props.item)}
              className={styles.buttonSellPopup}
            >
              <ClipLoaderButton loading={loading} color="white" />
            </div>
          ) : (
            <div
              onClick={() => sellNFT(props.item)}
              className={styles.buttonSellPopup}
            >
              SELL
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalSellNFT;
