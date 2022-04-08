import React, { useState, useEffect } from "react";
import styles from "../styles/Playgame.module.css";
import { useMoralis } from "react-moralis";
import { useUserState } from "../context/user";
import Unity, { UnityContext } from "react-unity-webgl";
export default function PlayGame() {
  const { isAuthenticated } = useMoralis();
  const { share_address_wallet } = useUserState();
  const unityContext = new UnityContext({
    loaderUrl: "buildUnity/again.loader.js",
    dataUrl: "buildUnity/gain.data",
    frameworkUrl: "buildUnity/again.framework.js",
    codeUrl: "buildUnity/again.wasm",
    webglContextAttributes:{
      preserveDrawingBuffer:true
    }
  });
  return (
    <div style={{ marginLeft: "15%" }}>
      <h1 className={styles.title}>PlayGame</h1>
      <Unity unityContext={unityContext} />
    </div>
  );
}
