import React from "react";
import styles from "../styles/MyItem.module.css";
import Image from "next/image";
import { Modal } from "react-bootstrap";
const ModalDetailNFT = (props) => {
  console.log(props);
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
          {props.item.name === "Animal Chests" ? (
            <div>
              <div> Random Items</div>
              <div>
                <Image
                  src="https://res.cloudinary.com/smilejob/image/upload/v1644302011/Farm-Souvirniors/Cow_vpruov.png"
                  alt="Cow"
                  width={40}
                  height={40}
                />
                <span>10% Chance</span>
              </div>
              <div>
                <Image
                  src='https://res.cloudinary.com/smilejob/image/upload/v1644302011/Farm-Souvirniors/Pig_gqadmy.png'
                  alt="Pig"
                  width={40}
                  height={40}
                />
                <span>30% Chance</span>
              </div>
              <div>
                <Image
                  src='https://res.cloudinary.com/smilejob/image/upload/v1646201434/Farm-Souvirniors/bird.png'
                  alt="Bird"
                  width={40}
                  height={40}
                />
                <span>60% Chance</span>
              </div>
            </div>
          ) : props.item.name === "Fruit Chests" ? (
            <div>
              <div> Random Items</div>
              <div>
                <Image
                  src="https://res.cloudinary.com/smilejob/image/upload/v1644302036/Farm-Souvirniors/Strawberry_vw8bde.png"
                  alt="Strawberry"
                  width={40}
                  height={40}
                />
                <span>10% Chance</span>
              </div>
              <div>
                <Image
                  src="https://res.cloudinary.com/smilejob/image/upload/v1644302035/Farm-Souvirniors/Grape_xljcuk.png"
                  alt="Grape"
                  width={40}
                  height={40}
                />
                <span>30% Chance</span>
              </div>
              <div>
                <Image
                  src="https://res.cloudinary.com/smilejob/image/upload/v1644302034/Farm-Souvirniors/Apple_tpsbss.png"
                  alt="Apple"
                  width={40}
                  height={40}
                />
                <span>60% Chance</span>
              </div>
            </div>
          ) : props.item.name === "Vegetable Chests" ? (
            <div>
              <div> Random Items</div>
              <div>
              <Image
                  src="https://res.cloudinary.com/smilejob/image/upload/v1644302036/Farm-Souvirniors/Pumpkin_uov1l1.png"
                  alt="Pumpkin"
                  width={40}
                  height={40}
                />
                <span>10% Chance</span>
              </div>
              <div>
              <Image
                  src="https://res.cloudinary.com/smilejob/image/upload/v1644302035/Farm-Souvirniors/Cauliflower_gwjecd.png"
                  alt="Cauliflower"
                  width={40}
                  height={40}
                />
                <span>30% Chance</span>
              </div>
              <div>
              <Image
                  src="https://res.cloudinary.com/smilejob/image/upload/v1644302035/Farm-Souvirniors/Corn_dl4f2a.png"
                  alt="Corn"
                  width={40}
                  height={40}
                />
                <span>60% Chance</span>
              </div>
            </div>
          ) : (
            <div>
              <div>Reward : {props.item.reward} meat</div>
              <div>Energy Consumed : {props.item.energy_consumed} meat</div>
              <div>Amount Food: {props.item.amount_food} fruit</div>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalDetailNFT;
