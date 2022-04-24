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
      <Modal.Header className={styles.popupBg1}>
      <div >Detail</div>
        <div className={styles.modalclose} onClick={() => handleClose()}>
         
          <div className="material-icons">close</div>
        </div>
      </Modal.Header>
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
          {props.item.name === "animal chests" ? (
            <div>
              <div className={styles.randomItems}> Random Items</div>
              <div className={styles.detailRandomItems}>
                <Image
                  src="https://res.cloudinary.com/smilejob/image/upload/v1644302011/Farm-Souvirniors/Cow_vpruov.png"
                  alt="Cow"
                  width={40}
                  height={40}
                />
                &nbsp;
                <div className={styles.detailRewar}>10% Chance</div>
              </div>
              <div className={styles.detailRandomItems}>
                <Image
                  src="https://res.cloudinary.com/smilejob/image/upload/v1644302011/Farm-Souvirniors/Pig_gqadmy.png"
                  alt="Pig"
                  width={40}
                  height={40}
                />
                &nbsp;
                <div className={styles.detailRewar}>30% Chance</div>
              </div>
              <div className={styles.detailRandomItems}>
                <Image
                  src="https://res.cloudinary.com/smilejob/image/upload/v1646201434/Farm-Souvirniors/bird.png"
                  alt="Bird"
                  width={40}
                  height={40}
                />
                &nbsp;
                <div className={styles.detailRewar}>60% Chance</div>
              </div>
            </div>
          ) : props.item.name === "fruit chests" ? (
            <div>
              <div className={styles.randomItems}> Random Items</div>
              <div className={styles.detailRandomItems}>
                <Image
                  src="https://res.cloudinary.com/smilejob/image/upload/v1644302036/Farm-Souvirniors/Strawberry_vw8bde.png"
                  alt="Strawberry"
                  width={40}
                  height={40}
                />
                &nbsp;
                <div className={styles.detailRewar}>10% Chance</div>
              </div>
              <div className={styles.detailRandomItems}>
                <Image
                  src="https://res.cloudinary.com/smilejob/image/upload/v1644302035/Farm-Souvirniors/Grape_xljcuk.png"
                  alt="Grape"
                  width={40}
                  height={40}
                />
                &nbsp;
                <div className={styles.detailRewar}>30% Chance</div>
              </div>
              <div className={styles.detailRandomItems}>
                <Image
                  src="https://res.cloudinary.com/smilejob/image/upload/v1644302034/Farm-Souvirniors/Apple_tpsbss.png"
                  alt="Apple"
                  width={40}
                  height={40}
                />
                &nbsp;
                <div className={styles.detailRewar}>60% Chance</div>
              </div>
            </div>
          ) : props.item.name === "vegetable chests" ? (
            <div>
              <div className={styles.randomItems}> Random Items</div>
              <div className={styles.detailRandomItems}>
                <Image
                  src="https://res.cloudinary.com/smilejob/image/upload/v1644302036/Farm-Souvirniors/Pumpkin_uov1l1.png"
                  alt="Pumpkin"
                  width={40}
                  height={40}
                />
                &nbsp;
                <div className={styles.detailRewar}>10% Chance</div>
              </div>
              <div className={styles.detailRandomItems}>
                <Image
                  src="https://res.cloudinary.com/smilejob/image/upload/v1644302035/Farm-Souvirniors/Cauliflower_gwjecd.png"
                  alt="Cauliflower"
                  width={40}
                  height={40}
                />
                &nbsp;
                <div className={styles.detailRewar}>30% Chance</div>
              </div>
              <div className={styles.detailRandomItems}>
                <Image
                  src="https://res.cloudinary.com/smilejob/image/upload/v1644302035/Farm-Souvirniors/Corn_dl4f2a.png"
                  alt="Corn"
                  width={40}
                  height={40}
                />
                &nbsp;
                <div className={styles.detailRewar}>60% Chance</div>
              </div>
            </div>
          ) : (
            <div>
              {props.item.type || props.item.type_nft === "fruit" ? (
                <>
                  <div className={styles.detailReward}>
                    Reward : {props.item.reward} Fruit
                  </div>

                  <div className={styles.detailReward}>
                    Energy Consumed : {props.item.energy_consumed} Energy
                  </div>

                  <div className={styles.detailReward}>
                    Amount Food : {props.item.amount_food} Fruit
                  </div>
                </>
              ) : props.item.type || props.item.type_nft === "animal" ? (
                <>
                  <div className={styles.detailReward}>
                    Reward : {props.item.reward} Meat
                  </div>

                  <div className={styles.detailReward}>
                    Energy Consumed : {props.item.energy_consumed} Energy
                  </div>

                  <div className={styles.detailReward}>
                    Amount Food : {props.item.amount_food} Fruit
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.detailReward}>
                    Reward : {props.item.reward} Wood
                  </div>
                  <div className={styles.detailReward}>
                    Energy Consumed :{props.item.energy_consumed} Energy
                  </div>
                  <div className={styles.detailReward}>
                    Amount Food :{props.item.amount_food} Fruit
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalDetailNFT;
