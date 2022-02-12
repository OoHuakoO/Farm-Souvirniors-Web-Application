import React from 'react';
import styles from "../styles/MyItem.module.css";
import Corn from "../public/corn.png";
import CardSell from "../components/CardSell";

export default function Sell() {
  const cardSell = [
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
       cardSell.map((item,index) => {
          return (
            <CardSell key={index} {...item} />
          
          )
        }
        )
      }
      
    </div>
  );
}
