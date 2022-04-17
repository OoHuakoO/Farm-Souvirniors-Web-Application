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
  const { share_address_wallet } = useUserState();
  const { isAuthenticated } = useMoralis();
  const unityContext = new UnityContext({
    loaderUrl: "buildUnity/Huak.loader.js",
    dataUrl: "buildUnity/Huak.data",
    frameworkUrl: "buildUnity/Huak.framework.js",
    codeUrl: "buildUnity/Huak.wasm",
  });
  const handleGetDataUser = async () => {
    if (share_address_wallet) {
      let response = await getDataUser(share_address_wallet);
      setDataResource(response.data.resource);
    }
  };
  useEffect(() => {
    setTimeout(async () => {
      const web3 = new Web3(Web3.givenProvider || Config.web3ProviderGanache);
      const accounts = await web3.eth.requestAccounts();
      unityContext.send("Canvas", "SpawnEnemies", accounts[0]);
    }, 2000);
  }, []);
  useEffect(() => {
    handleGetDataUser();
  }, [isAuthenticated, share_address_wallet]);
  const [showPopupModalPlayGame, setShowPopupModalPlayGame] = useState(false);
  const handleShowPopupModalPlayGame = () => setShowPopupModalPlayGame(true);

  return (
    <div className={styles.maincategoryInventories}>
      <div className={styles.energyInventories}>
        <div className={styles.energyInventories1}>
          <div>Energy </div>
          <div className="material-icons">bolt</div>
        </div>
        <div className={styles.progressBar}>
          <ProgressBar
            completed={300}
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
      <ModalPlayGame
        item={props}
        setShowPopupModalPlayGame={setShowPopupModalPlayGame}
        showPopupModalPlayGame={showPopupModalPlayGame}
      />
    </div>
  );
}
