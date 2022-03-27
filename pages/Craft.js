import React, { useState, useEffect } from "react";
import CardCraft from "../components/CardCraft";
import styles from "../styles/MyItem.module.css";
import { getInfoNFT } from "../api/info-nft";
import { getDataUser } from "../api/user";
import { useUserState } from "../context/user";
import CardInventories from "../components/CardInventories";
import { useMoralis } from "react-moralis";
export default function Craft() {
  const { share_address_wallet } = useUserState();
  const [dataCraft, setDataCraft] = useState([]);
  const [dataResource, setDataResource] = useState();
  const categories = ["all", "animal", "fruit", "vegetable"];
  const [CurrentCategory, setCurrentCategory] = useState("all");
  const { isAuthenticated } = useMoralis();
  const handleGetDataUser = async () => {
    if (share_address_wallet) {
      let response = await getDataUser(share_address_wallet);
      setDataResource(response.data.resource);
    }
  };
  const fetchGetInfoNFT = async () => {
    let response = await getInfoNFT();
    setDataCraft(response.data);
  };
  useEffect(() => {
    fetchGetInfoNFT();
    return () => {
      setDataCraft([]);
      setCurrentCategory("all");
    };
  }, []);
  useEffect(() => {
    handleGetDataUser();
  }, [isAuthenticated, share_address_wallet]);
  return (
    <div>
      <div className={styles.maincategoryInventories}>
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

        <CardInventories dataResource={dataResource} />
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
