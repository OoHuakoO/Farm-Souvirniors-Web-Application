import React from "react";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import styles from "../styles/MyItem.module.css";
const override = css`
  display: flex;
  margin: 0px auto;
  
  
`;
const ClipLoaderButton = ({ loading, color }) => {
  return (
    <div className={styles.clipLoaderButton}>
    <ClipLoader color={color} loading={loading} size={120} css={override} /></div>
  );
};
export default ClipLoaderButton;
