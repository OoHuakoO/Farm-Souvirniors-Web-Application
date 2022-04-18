import React, { useState } from "react";
import { CopyOutlined } from "@ant-design/icons";
import styles from "../styles/EmptyData.module.css";
const EmptyData = (props) => {
  return (
    <div className={styles.emptyData}>
      <div className={styles.emptyData1}>
     <div className={styles.copyOutlined}> <CopyOutlined /></div>
      <div className={styles.noData}>No Data</div></div>
    </div>
  );
};

export default EmptyData;
