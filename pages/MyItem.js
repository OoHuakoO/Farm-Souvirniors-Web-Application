import React, { useState } from "react";
import styles from "../styles/MyItem.module.css";
import CardMyItem from "../components/CardMyItem";

export default function MyItem() {
  const cardMyItem = [
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
          ? cardMyItem.map((item, index) => {
              return <CardMyItem key={index} {...item} />;
            })
          : cardMyItem
              .filter((_item) => CurrentCategory === _item.category)
              .map((item, index) => {
                return <CardMyItem key={index} {...item} />;
              })}
      </div>
    </div>
  );
}
