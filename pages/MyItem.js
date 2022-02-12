import React from "react";
import styles from "../styles/MyItem.module.css";
import Corn from "../public/corn.png";
import CardMyItem from "../components/CardMyItem";

export default function MyItem() {
  const cardMyItem = [
    {
      name: "Corn",
      UID: 10024510303,
      image: "Corn.png",
    },
    {
      name: "Corn",
      UID: 10024510303,
      image: "Corn.png",
    },
    {
      name: "Corn",
      UID: 10024510303,
      image: "Corn.png",
    },
    {
      name: "Corn",
      UID: 10024510303,
      image: "Corn.png",
    },
   
  ];
  return (
    <div className={styles.mainMyItem}>
      {
        cardMyItem.map((item,index) => {
          return (
            <CardMyItem key={index} {...item} />
          
          )
        }
        )
      }
      
    </div>
  );
}
