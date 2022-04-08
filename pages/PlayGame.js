import React, { useState, useEffect } from "react";
import styles from "../styles/Playgame.module.css";
import { useMoralis } from "react-moralis";
import { useUserState } from "../context/user";
import Unity, { UnityContext } from "react-unity-webgl";
export default function PlayGame() {
  const { isAuthenticated } = useMoralis();
  const { share_address_wallet } = useUserState();
  const unityContext = new UnityContext({
    loaderUrl: "buildUnity/Other.loader.js",
    dataUrl: "buildUnity/Other.data",
    frameworkUrl: "buildUnity/Other.framework.js",
    codeUrl: "buildUnity/Other.wasm",
    webglContextAttributes: {
      preserveDrawingBuffer: true,
    },
  });
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
