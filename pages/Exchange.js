import React from "react";
import CardExchange from "../components/CardExchange";
import styles from "../styles/Exchange.module.css";

export default function Exchange() {
  const cardExchange = [
    {
      name: "Corn",
      UID: 10024510303,
      image: "Corn.png",
      category: "Vetgetable",
    },
    {
      name: "Corn",
      UID: 10024510303,
      image: "Corn.png",
      category: "Animal",
    },
    {
      name: "Corn",
      UID: 100245103035,
      image: "Corn.png",
      category: "Fruit",
    },
    {
      name: "Corn",
      UID: 10024510303,
      image: "Corn.png",
      category: "Vetgetable",
    },
   
  ];
  return (
    <div className={styles.mainMyItem}>
      {
       cardExchange.map((item,index) => {
          return (
            <CardExchange key={index} {...item} />
          
          )
        }
        )
      }
      
    </div>
  );
}
