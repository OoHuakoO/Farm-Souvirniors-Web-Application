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
      <ProgressBar completed={200} maxCompleted={500} width="200px"/>
      <CardInventories dataResource={dataResource} />

      {/* <Unity
        style={{ height: "680px", width: "700px", alignSelf: "center" }}
        unityContext={unityContext}
      /> */}
    </div>
  );
}
