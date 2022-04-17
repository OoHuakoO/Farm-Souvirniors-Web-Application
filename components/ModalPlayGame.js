import React, { useState, useEffect } from "react";
import styles from "../styles/ModalPlayGame.module.css";
import { Modal, Button } from "react-bootstrap";
import Image from "next/image";
import Meat from "../public/meat.png";
import Wood from "../public/wood.png";
import Apple from "../public/apple.png";
const ModalPlayGame = (props) => {
  const handleClose = () => props.setShowPopupModalPlayGame(false);
  const [SelectedCoinIndex, setSelectedCoinIndex] = useState(0);
  const [ExchangePrice, setExchangePrice] = useState(0);
  const [inputSaveCoin, setInputSaveCoin] = useState(0);
  const [EnergyPrice, setEnergyPrice] = useState(0);
  const calculateCoin = (event) => {
    const InputSaveCoin = Number(event.target.value);
    setInputSaveCoin(InputSaveCoin);
    const TotalCoin =InputSaveCoin * 5;
    const EnergyCoin = InputSaveCoin + TotalCoin;
    setEnergyPrice(EnergyCoin);
    setExchangePrice(TotalCoin);
  };
  return (
    <Modal
      show={props.showPopupModalPlayGame}
      onHide={() => handleClose()}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className={styles.modalPlayGameHeader}>
        <div>Add Energy</div>
        <div className={styles.modalclose} onClick={() => handleClose()}>
          <div className="material-icons">close</div>
        </div>
      </Modal.Header>

      <Modal.Body className={styles.modalPlayGameBGColor}>
        <div className={styles.modalPlayGameBG}>
          <div className={styles.modalPlayGameBG}>
            <div className={styles.inventoriesPlayGame}>
              <div>
                <Image src={Meat} alt="Apple" width={30} height={30} />
              </div>
              &nbsp;
              <div className={styles.inputEnergy}>
                <input
                  type="number"
                  className="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={calculateCoin}
                />
              </div>
            </div>
          </div>

          <div className="material-icons">arrow_forward</div>
          <div className={styles.modalPlayGameBG}>
            <div className="material-icons">bolt</div>
            <div>{ExchangePrice}</div>
          </div>
        </div>
        <div className={styles.modalPlayGameEnergy}>
          <div>1 Meat = 5 Energy</div>
          <div>Max 500 Energy</div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button
          onClick={() => handleClose()}
          variant="secondary"
          className={styles.buttonPopupNotenoughCoin}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalPlayGame;
