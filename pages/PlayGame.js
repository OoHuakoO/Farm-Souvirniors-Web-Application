import React, { useState, useEffect } from "react";
import styles from "../styles/Playgame.module.css";
import Web3 from "web3";
import Unity, { UnityContext } from "react-unity-webgl";
import CardInventories from "../components/CardInventories";
import ProgressBar from "@ramonak/react-progress-bar";
export default function PlayGame() {
  const [dataResource, setDataResource] = useState();
  const unityContext = new UnityContext({
    loaderUrl: "buildUnity/Huak.loader.js",
    dataUrl: "buildUnity/Huak.data",
    frameworkUrl: "buildUnity/Huak.framework.js",
    codeUrl: "buildUnity/Huak.wasm",
  });

  useEffect(() => {
    setTimeout(async () => {
      const web3 = new Web3(Web3.givenProvider || Config.web3ProviderGanache);
      const accounts = await web3.eth.requestAccounts();
      unityContext.send("Canvas", "SpawnEnemies", accounts[0]);
    }, 2000);
  }, []);

  return (
    <div className={styles.maincategoryInventories}>
      <div className={styles.energyInventories}>
        <div className={styles.energyInventories1}>
          <div>Energy </div>
          <div className="material-icons">bolt</div>
        </div>
        <div className={styles.progressBar}>
          <ProgressBar
            completed={90}
            maxCompleted={100}
            width="400px"
            height="30px"
          />
          <div className={styles.progressBaradd}>
            <div className="material-icons">add</div>
          </div>
        </div>
      </div>
      <CardInventories dataResource={dataResource} />
    </div>
  );
}
