import React from 'react';
import CardCraft from '../components/CardCraft';
import styles from "../styles/MyItem.module.css";
import Corn from "../public/corn.png";

export default function Craft() {
  const cardSell = [
    {
      name: "Corn",
      UID: 10024510303,
      image: "Corn.png",
      imageCoin1: "",
      coin1:"",
      imageCoin2: "",
      coin2:"",

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
            <CardCraft key={index} {...item} />
          
          )
        }
        )
      }
      
    </div>
  )
}
