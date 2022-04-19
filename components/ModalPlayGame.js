import React, { useState, useEffect } from "react";
import styles from "../styles/ModalPlayGame.module.css";
import { Modal, Button } from "react-bootstrap";
import Image from "next/image";
import Meat from "../public/meat.png";
import { addEnergy } from "../api/user";
import { Range, getTrackBackground } from "react-range";

const ModalPlayGame = (props) => {
  const handleClose = () => props.setShowPopupModalPlayGame(false);
  const [TotalEnergy, setTotalEnergy] = useState(0);
  const [rangeMeat, setRangeMeat] = useState([0]);
  const [energyError, setEnergyError] = useState(false);
  const [meatError, setMeatError] = useState(false);
  const [maxMeat, setMaxMeat] = useState(props.dataResource.meat);
  const calculateEnergy = (value) => {

    setRangeMeat(value);
    const TotalEnergy = value[0] * 5;
    setTotalEnergy(TotalEnergy);
    if (
      TotalEnergy > props.maxEnergy &&
      props.dataResource.meat < value[0]
    ) {
      setMeatError(true);
      setEnergyError(false);
    } else if (props.dataResource.meat < value[0]) {
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
  const handleAddEnergy = async () => {
    const response = await addEnergy(
      props.share_address_wallet,
      rangeMeat[0],
      TotalEnergy
    );

    if (response.status === "success") {
      handleClose();
      props.setRefreshResource(!props.refreshResource);
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
          <div className={styles.modalPlayGameBG1}>
            <div className={styles.inventoriesPlayGame}>
              <div className={styles.boxImgMeat}>
                <Image src={Meat} alt="Meat" width={30} height={30} />
              </div>
              <Range
                step={1}
                min={0}
                max={maxMeat}
                values={rangeMeat}
                onChange={(values) => {
                  calculateEnergy(values);
                }}
                renderTrack={({ props, children }) => (
                  <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                      ...props.style,
                      height: "20px",
                      display: "flex",
                      width: "120px",
                    }}
                  >
                    <div
                      ref={props.ref}
                      style={{
                        height: "5px",
                        width: "100%",
                        borderRadius: "4px",
                        background: getTrackBackground({
                          values: rangeMeat,
                          colors: ["#ffa34c", "#ccc"],
                          min: 0,
                          max: maxMeat,
                        }),
                        alignSelf: "center",
                      }}
                    >
                      {children}
                    </div>
                  </div>
                )}
                renderThumb={({ props, isDragged }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "30px",
                      width: "30px",
                      borderRadius: "4px",
                      backgroundColor: "#FFF",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0px 2px 6px #AAA",
                    }}
                  >
                    <div
                      style={{
                        height: "10px",
                        width: "5px",
                        backgroundColor: isDragged ? "#ffa34c" : "#CCC",
                      }}
                    />
                  </div>
                )}
              />
              <span className={styles.textRangeMeat}>{rangeMeat[0]}</span>
            </div>
          </div>

          <div className="material-icons">arrow_forward</div>
          <div className={styles.modalPlayGameBG1}>
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
          <div className={styles.modalPlayGameFooter}>
            <div>Not enough meat</div>
            <Button className={styles.buttonConfirm}>Confirm</Button>
          </div>
        ) : energyError ? (
          <div className={styles.modalPlayGameFooter}>
            <div>The result energy has exceeded the maximum energy</div>
            <Button className={styles.buttonConfirm}>Confirm</Button>
          </div>
        ) : (
          <Button
            onClick={() => handleAddEnergy()}
            className={styles.buttonConfirm}
          >
            Confirm
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
export default ModalPlayGame;
