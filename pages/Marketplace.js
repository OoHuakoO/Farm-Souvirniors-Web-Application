import React, { useState } from 'react';
import styles from "../styles/MyItem.module.css";
import Corn from "../public/corn.png";
import CardMarketplace from "../components/CardMarketplace";

export default function Marketplace() {
  const cardMarketplace = [
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
  const categories = ["All","Animal","Fruit", "Vetgetable", "Chest"];
  const [CurrentCategory, setCurrentCategory] = useState("All");
  return (
    <div>
      <div className={styles.maincategory}> Class : 
        {categories.map((category) => {
          return (
            <button className={CurrentCategory === category ? styles.buttonCategoryActive : styles.buttonCategory} onClick={()=>setCurrentCategory(category)} key={category}>{category}</button>
          )
        })}
      </div>
      <div className={styles.mainMyItem}>
        {CurrentCategory == "All"
          ? cardMarketplace.map((item, index) => {
              return <CardMarketplace key={index} {...item} />;
            })
          : cardMarketplace
              .filter((_item) => CurrentCategory === _item.category)
              .map((item, index) => {
                return <CardMarketplace key={index} {...item} />;
              })}
      </div>
    </div>
    
  );
}
