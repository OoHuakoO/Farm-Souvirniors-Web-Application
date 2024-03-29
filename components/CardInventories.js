import React from "react";
import styles from "../styles/Inventories.module.css";
import Image from "next/image";
import Meat from "../public/meat.png";
import Wood from "../public/wood.png";
import Apple from "../public/apple.png";

const CardInventories = (props) => {
  return (
    <div className={styles.topicInventories}>
      <div className={styles.inventories}>
        <span>
          <Image src={Apple} alt="Apple" width={25} height={25} />
        </span>
        <span className={styles.inventoriesCoin}>
          {props.dataResource &&  Math.floor(parseFloat(props.dataResource.fruit) * 100) / 100}
        </span>
      </div>
      <div className={styles.inventories}>
        <span>
          <Image src={Wood} alt="Apple" width={30} height={30} />
        </span>
        <span className={styles.inventoriesCoin}>
          {" "}
          {props.dataResource &&  Math.floor(parseFloat(props.dataResource.wood) * 100) / 100}{" "}
        </span>
      </div>
      <div className={styles.inventories}>
        <span>
          <Image src={Meat} alt="Apple" width={30} height={30} />
        </span>
        <span className={styles.inventoriesCoin}>
          {" "}
          {props.dataResource &&  Math.floor(parseFloat(props.dataResource.meat) * 100) / 100}{" "}
        </span>
      </div>
    </div>
  );
};

export default CardInventories;
