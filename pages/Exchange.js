import React, { useState } from "react";
import CardExchange from "../components/CardExchange";
import styles from "../styles/Exchange.module.css";
export default function Exchange() {
  const cardExchange = [
    {
      name: "Corn",
      UID: 10024510303,
      image: "Corn.png",
      category: "Deposit",
    },
    // {
    //   name: "Corn",
    //   UID: 10024510303,
    //   image: "Corn.png",
    //   category: "Deposit",
    // },
    // {
    //   name: "Corn",
    //   UID: 100245103035,
    //   image: "Corn.png",
    //   category: "",
    // },
    // {
    //   name: "Corn",
    //   UID: 10024510303,
    //   image: "Corn.png",
    //   category: "",
    // },
   
  ];
  const categories = ["Withdraw","Deposit"];
  const [CurrentCategory, setCurrentCategory] = useState("Withdraw");
  return (
    <div>
      <div className={styles.maincategory}> 
        {categories.map((category) => {
          return (
            <button className={CurrentCategory === category ? styles.buttonCategoryActive : styles.buttonCategory} onClick={()=>setCurrentCategory(category)} key={category}>{category}</button>
          )
        })}
      </div>
      <div>
        {CurrentCategory == "Withdraw"
          ? cardExchange.map((item, index) => {
              return <CardExchange key={index} {...item} />;
            })
          : cardExchange
              .filter((_item) => CurrentCategory === _item.category)
              .map((item, index) => {
                return <CardExchange key={index} {...item} />;
              })}
      </div>
    </div>
  );
}
