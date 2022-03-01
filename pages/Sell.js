import React, { useState } from "react";
import styles from "../styles/MyItem.module.css";
import Corn from "../public/corn.png";
import CardSell from "../components/CardSell";

export default function Sell() {
  const cardSell = [
    {
      name: "Corn",
      UID: 10024510303,
      image: "Corn.png",
      category: "vegetable",
    },
    {
      name: "Corn",
      UID: 10024510303,
      image: "Corn.png",
      category: "animal",
    },
    {
      name: "Corn",
      UID: 100245103035,
      image: "Corn.png",
      category: "fruit",
    },
    {
      name: "Corn",
      UID: 10024510303,
      image: "Corn.png",
      category: "vegetable",
    },
  ];
  const categories = ["all", "animal", "fruit", "vegetable", "chest"];
  const [CurrentCategory, setCurrentCategory] = useState("all");
  return (
    <div>
      <div className={styles.maincategory}>
        {" "}
        Class :
        {categories.map((category) => {
          return (
            <button
              className={
                CurrentCategory === category
                  ? styles.buttonCategoryActive
                  : styles.buttonCategory
              }
              onClick={() => setCurrentCategory(category)}
              key={category}
            >
              {category}
            </button>
          );
        })}
      </div>
      <div className={styles.mainMyItem}>
        {CurrentCategory == "all"
          ? cardSell.map((item, index) => {
              return <CardSell key={index} {...item} />;
            })
          : cardSell
              .filter((_item) => CurrentCategory === _item.category)
              .map((item, index) => {
                return <CardSell key={index} {...item} />;
              })}
      </div>
    </div>
  );
}
