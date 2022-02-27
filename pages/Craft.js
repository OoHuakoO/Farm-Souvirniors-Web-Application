import React, { useState } from 'react';
import CardCraft from '../components/CardCraft';
import styles from "../styles/MyItem.module.css";
import Corn from "../public/corn.png";
import coinApple from "../public/coinApple.png";
import coinWood from "../public/coinWood.svg";
export default function Craft() {
  const cardCraft = [
    {
      name: "Corn",
      UID: 10024510303,
      image: "Corn.png",
      category: "Vetgetable",
      iconcoin1: "coinWood.svg",
      coin1:1000,
      iconcoin2: "coinApple.png",
      coin2:200,
    },
    {
      name: "Corn",
      UID: 10024510303,
      image: "Corn.png",
      category: "Animal",
      iconcoin1: "coinWood.svg",
      coin1:1000,
      iconcoin2: "coinApple.png",
      coin2:200,
    },
    {
      name: "Corn",
      UID: 100245103035,
      image: "Corn.png",
      category: "Fruit",
      iconcoin1: "coinWood.svg",
      coin1:1000,
      iconcoin2: "coinApple.png",
      coin2:200,
    },
    {
      name: "Corn",
      UID: 10024510303,
      image: "Corn.png",
      category: "Vetgetable",
      iconcoin1: "coinWood.svg",
      coin1:1000,
      iconcoin2: "coinApple.png",
      coin2:200,
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
          ? cardCraft.map((item, index) => {
              return <CardCraft key={index} {...item} />;
            })
          : cardCraft
              .filter((_item) => CurrentCategory === _item.category)
              .map((item, index) => {
                return <CardCraft key={index} {...item} />;
              })}
      </div>
    </div>
    
  )
}
