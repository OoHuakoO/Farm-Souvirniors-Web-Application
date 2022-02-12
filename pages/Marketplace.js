import React from 'react';
import styles from "../styles/MyItem.module.css";
import Corn from "../public/corn.png";
import CardMarketplace from "../components/CardMarketplace";

export default function Marketplace() {
  const cardMarketplace = [
    {
      name: "Corn",
      UID: 10024510303,
      image: "Corn.png",
      price: 5,
      seller: "0x...n53b5"
    },
    {
      name: "Corn",
      UID: 10024510303,
      image: "Corn.png",
      price: 5,
      seller: "0x...n53b5"
    },
    {
      name: "Corn",
      UID: 10024510303,
      image: "Corn.png",
      price: 5,
      seller: "0x...n53b5"
    },
    {
      name: "Corn",
      UID: 10024510303,
      image: "Corn.png",
      price: 5,
      seller: "0x...n53b5"
    },
   
  ];
  return (
    <div className={styles.mainMyItem}>
      {
       cardMarketplace.map((item,index) => {
          return (
            <CardMarketplace key={index} {...item} />
          
          )
        }
        )
      }
      
    </div>
  );
}
