import React, { useState, useEffect } from "react";
import CardCraft from "../components/CardCraft";
import styles from "../styles/MyItem.module.css";
import { getInfoNFT } from "../api/info-nft";
import { useUserState } from "../context/user";
export default function Craft() {
  const { share_address_wallet } = useUserState();
  const [dataCraft, setDataCraft] = useState([]);
  const categories = ["all", "animal", "fruit", "vegetable"];
  const [CurrentCategory, setCurrentCategory] = useState("all");
  useEffect(() => {
    async function fetchGetInfoNFT() {
      let response = await getInfoNFT();
      setDataCraft(response.data);
    }
    fetchGetInfoNFT();
  }, []);
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
          ? dataCraft.map((item, index) => {
              return (
                <CardCraft
                  key={index}
                  {...item}
                  share_address_wallet={share_address_wallet}
                />
              );
            })
          : dataCraft
              .filter((_item) => CurrentCategory === _item.type)
              .map((item, index) => {
                return (
                  <CardCraft
                    key={index}
                    {...item}
                    share_address_wallet={share_address_wallet}
                  />
                );
              })}
      </div>
    </div>
  );
}
