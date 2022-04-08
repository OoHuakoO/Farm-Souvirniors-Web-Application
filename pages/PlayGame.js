import React, { useState, useEffect } from "react";
import styles from "../styles/Playgame.module.css";
import Web3 from "web3";
import Unity, { UnityContext } from "react-unity-webgl";
export default function PlayGame() {
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
      unityContext.send("GameManager", "SpawnEnemies", accounts[0]);
    }, 6000);
  }, []);

  return (
    <div style={{ marginLeft: "15%" }}>
      <h1 className={styles.title}>PlayGame</h1>
      <Unity
        style={{ height: "680px", width: "700px", alignSelf: "center" }}
        unityContext={unityContext}
      />
      ;
    </div>
  );
}
