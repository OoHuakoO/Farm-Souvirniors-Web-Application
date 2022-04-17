import React, { useState, useEffect } from "react";
import styles from "../styles/ModalPlayGame.module.css";
import { Modal, Button } from "react-bootstrap";
import Image from "next/image";
import Meat from "../public/meat.png";
const ModalPlayGame = (props) => {
  const handleClose = () => props.setShowPopupModalPlayGame(false);
  const [TotalEnergy, setTotalEnergy] = useState(0);
  const [energyError, setEnergyError] = useState(false);
  const [meatError, setMeatError] = useState(false);
  const calculateEnergy = (event) => {
    const InputMeat = Number(event.target.value);
    const TotalEnergy = InputMeat * 5;

    setTotalEnergy(TotalEnergy);
    if (TotalEnergy > props.maxEnergy && props.dataResource.meat < InputMeat) {
      setMeatError(true);
      setEnergyError(false);
    } else if (props.dataResource.meat < InputMeat) {
      setMeatError(true);
      setEnergyError(false);
    } else if (TotalEnergy > props.maxEnergy) {
      setMeatError(false);
      setEnergyError(true);
    } else {
      setEnergyError(false);
      setMeatError(false);
    }
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
                  className="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={calculateEnergy}
                  type="number"
                />
              </div>
            </div>
          </div>

          <div className="material-icons">arrow_forward</div>
          <div className={styles.modalPlayGameBG}>
            <div className="material-icons">bolt</div>
            <div>{TotalEnergy}</div>
          </div>
        </div>
        <div className={styles.modalPlayGameEnergy}>
          <div>1 Meat = 5 Energy</div>
          <div>Max {props.maxEnergy} Energy</div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        {meatError ? (
          <div>
            <p>Not enough meat</p>
            <Button
              variant="secondary"
              className={styles.buttonPopupNotenoughCoin}
            >
              Confirm
            </Button>
          </div>
        ) : energyError ? (
          <div>
            <p>The result energy has exceeded the maximum energy</p>
            <Button
              variant="secondary"
              className={styles.buttonPopupNotenoughCoin}
            >
              Confirm
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => handleClose()}
            variant="secondary"
            className={styles.buttonPopupNotenoughCoin}
          >
            Confirm
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
export default ModalPlayGame;
