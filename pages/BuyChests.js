import React from "react";
import styles from "../styles/BuyChests.module.css";
import Image from "next/image";
import Box1 from "../public/Box1.png";
import Ethereum from "../public/Ethereum-icon-purple.png";
import CardBuychests from "../components/CardBuyChests";

export default function BuyChests() {
  const cardBuyChest = [
    {
      name: "Animal Chests",
      price: 1,
      balance: 3000,
      total: 3000,
      image: "Box1.png",
    },
    {
      name: "Vegatable Chests",
      price: 1,
      balance: 3000,
      total: 3000,
      image: "Box1.png",
    },
    {
      name: "Fruit Chests",
      price: 1,
      balance: 3000,
      total: 3000,
      image: "Box1.png",
    },
  ];
  return (
    <div className={styles.BuyChestsPages}>
      {cardBuyChest.map((item, index) => {
        return <CardBuychests key={index} {...item} />;
      })}
    </div>
  );
}
