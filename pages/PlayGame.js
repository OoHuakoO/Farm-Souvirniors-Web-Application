import React, { useState, useEffect } from "react";
import styles from "../styles/Playgame.module.css";
import Web3 from "web3";
import Unity, { UnityContext } from "react-unity-webgl";
import CardInventories from "../components/CardInventories";
import ProgressBar from "@ramonak/react-progress-bar";
import ModalPlayGame from "../components/ModalPlayGame";
import { useUserState } from "../context/user";
import { useMoralis } from "react-moralis";
import { getDataUser } from "../api/user";
export default function PlayGame(props) {
  const [dataResource, setDataResource] = useState();
  const [energy, setEnergy] = useState(0);
  const [maxEnergy, setMaxEnergy] = useState(0);
  const [refreshResource, setRefreshResource] = useState(false);
  const { share_address_wallet } = useUserState();
  const { isAuthenticated } = useMoralis();
  console.log(share_address_wallet)
  const unityContext = new UnityContext({
    loaderUrl: "buildUnity/Huak.loader.js",
    dataUrl: "buildUnity/Huak.data",
    frameworkUrl: "buildUnity/Huak.framework.js",
    codeUrl: "buildUnity/Huak.wasm",
  });
  const [showPopupModalPlayGame, setShowPopupModalPlayGame] = useState(false);
  const handleShowPopupModalPlayGame = () => setShowPopupModalPlayGame(true);
  const handleGetDataUser = async () => {
    if (share_address_wallet) {
      let response = await getDataUser(share_address_wallet);
      setDataResource(response.data.resource);
      setEnergy(response.data.energy.toString());
      setMaxEnergy(500 - response.data.energy);
    }
  };
  useEffect(() => {
    unityContext.on("GameOver", function (action) {
      console.log("action", action);
      setRefreshResource(Math.random());
    });
    setTimeout(async () => {
      const web3 = new Web3(Web3.givenProvider ||  Config.web3ProviderGanache);
      const accounts = await web3.eth.requestAccounts();
      unityContext.send("Canvas", "SpawnEnemies", accounts[0]);
    }, 2000);
  }, []);
  useEffect(() => {
    handleGetDataUser();
  }, [isAuthenticated, share_address_wallet, refreshResource]);
  return (
    <div className={styles.mainBG15}>
      <div className={styles.maincategoryInventories}>
        <div className={styles.energyInventories}>
          <div className={styles.energyInventories1}>
            <div>Energy </div>
            <div className="material-icons">bolt</div>
            <div> Max 500 Energy</div>
          </div>
          <div className={styles.progressBar}>
            <ProgressBar
              completed={energy}
              maxCompleted={500}
              width="400px"
              height="30px"
              bgColor="#ffa34c"
            />
            <div
              className={styles.progressBaradd}
              onClick={handleShowPopupModalPlayGame}
            >
              <div className="material-icons">add</div>
            </div>
          </div>
        </div>

        <CardInventories dataResource={dataResource} />
      </div>
      {dataResource ? (
        <ModalPlayGame
          item={props}
          setShowPopupModalPlayGame={setShowPopupModalPlayGame}
          showPopupModalPlayGame={showPopupModalPlayGame}
          maxEnergy={maxEnergy}
          dataResource={dataResource}
          share_address_wallet={share_address_wallet}
          refreshResource={refreshResource}
          setRefreshResource={setRefreshResource}
        />
      ) : null}

      <Unity
        style={{ height: "81vh", width: "100%" }}
        unityContext={unityContext}
      />
    </div>
  );
}
