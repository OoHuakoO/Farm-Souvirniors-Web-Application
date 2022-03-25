import React,{ useState, useEffect } from "react";
import styles from "../styles/MyItem.module.css";
import Image from "next/image";
import { sellNFTAPI } from "../api/marketplace";
import { sellNFTWeb3 } from "../web3/nft";
import {
  sellNFTWeb3InstanceRandombox,
  openRandomBoxWeb3,
} from "../web3/randomBox";
import { openRandomBoxAPI, getOneInfoNFT } from "../api/random-box";
import { useRouter } from "next/router";
import { Modal, Button } from "react-bootstrap";
const CardMyItem = (props) => {
  const router = useRouter();
  const randomNFT = (values) => {
    let i,
      pickedValue,
      randomNr = Math.random(),
      threshold = 0;

    for (i = 0; i < values.length; i++) {
      threshold += values[i].probability;
      if (threshold > randomNr) {
        pickedValue = values[i].value;
        break;
      }
    }
    return pickedValue;
  };
  const openRandombox = async (item) => {
    const pid = Date.now();
    var NFT;
    let animal = [
      {
        value: "cow",
        probability: 0.1,
      },
      {
        value: "pig",
        probability: 0.3,
      },
      {
        value: "bird",
        probability: 0.6,
      },
    ];
    let fruit = [
      {
        value: "strawberry",
        probability: 0.1,
      },
      {
        value: "grape",
        probability: 0.3,
      },
      {
        value: "apple",
        probability: 0.6,
      },
    ];
    let vegetable = [
      {
        value: "cauliflower",
        probability: 0.1,
      },
      {
        value: "pumpkin",
        probability: 0.3,
      },
      {
        value: "corn",
        probability: 0.6,
      },
    ];
    if (item.name === "animal chests") {
      NFT = randomNFT(animal);
    } else if (item.name === "Fruit Chests") {
      NFT = randomNFT(fruit);
    } else if (item.name === "Vegetable Chests") {
      NFT = randomNFT(vegetable);
    }
    if (NFT) {
      let responseGetInfoNFT = await getOneInfoNFT(NFT);
      if (responseGetInfoNFT.data) {
        let responseWeb3 = await openRandomBoxWeb3(
          pid,
          responseGetInfoNFT.data.name,
          responseGetInfoNFT.data.picture,
          responseGetInfoNFT.data.reward,
          responseGetInfoNFT.data.type,
          responseGetInfoNFT.data.cost.wood,
          responseGetInfoNFT.data.cost.fruit,
          responseGetInfoNFT.data.energy_consumed,
          responseGetInfoNFT.data.amount_food,
          props.share_address_wallet,
          item.indexNFT
        );
        console.log(responseWeb3);
        if (responseWeb3) {
          let responseAPI = await openRandomBoxAPI(
            pid,
            props.share_address_wallet,
            responseGetInfoNFT.data.name
          );
          props.setRefrestFetchAPI(!props.refrestFetchAPI);
          console.log(responseAPI);
        }
      }
    }
  };
  const sellNFT = async (item) => {
    if (item.from === "nft") {
      const responseWeb3 = await sellNFTWeb3(
        props.share_address_wallet,
        item.indexNFT,
        "0.01"
      );
      if (responseWeb3) {
        const responseAPI = await sellNFTAPI("0.01", item.nft_id);
        console.log(responseAPI);
        router.push({
          pathname: "/Sell",
        });
      }
    } else if (item.from === "randombox") {
      const responseWeb3InstanceRandombox = await sellNFTWeb3InstanceRandombox(
        props.share_address_wallet,
        item.indexNFT,
        "0.01"
      );
      if (responseWeb3InstanceRandombox) {
        const responseAPI = await sellNFTAPI("0.01", item.nft_id);
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
      "0.01"
    );
    router.push({
      pathname: "/Sell",
    });
    console.log(response);
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
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            onClick={() => openRandombox(props)}
            className={styles.buttonSell}
          >
            <span>Open</span>
          </div>
          <div
            onClick={() => sellRandombox(props)}
            className={styles.buttonSell}
          >
            <span>Sell</span>
          </div>
        </div>
      ) : props.status === "not_plant" ? (
        <div onClick={() => sellNFT(props)} className={styles.buttonSell}>
          <span> Sell</span>
        </div>
      ) : (
        <>
          <div className={styles.buttonSell}>
            <span>Not Sell</span>
          </div>
          <div>
            <span>this nft in game</span>
          </div>
        </>
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

export default CardMyItem;
