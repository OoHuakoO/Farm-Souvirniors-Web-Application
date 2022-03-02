import React, { useState, useEffect } from "react";
import styles from "../styles/MyItem.module.css";
import CardSell from "../components/CardSell";
import { useUserState } from "../context/user";
import { getOwnerNftWeb3, getContractAddress } from "../web3/index";
import { useMoralis } from "react-moralis";
export default function Sell() {
  const { share_address_wallet } = useUserState();
  const [dataMySell, setDataMySell] = useState([]);
  const { isAuthenticated } = useMoralis();
  const categories = ["all", "animal", "fruit", "vegetable", "chest"];
  const [CurrentCategory, setCurrentCategory] = useState("all");
  useEffect(() => {
    async function fetchGetMySell() {
      let listOwnerNFT = [];
      if (isAuthenticated) {
        let responseContractAddress = await getContractAddress();
        let responseWeb3 = await getOwnerNftWeb3(responseContractAddress);
        if (responseWeb3) {
          await responseWeb3.map(async (data, index) => {
            if (data.seller === share_address_wallet) {
              listOwnerNFT.push(data);
            }
            if (responseWeb3.length - 1 === index) {
              setDataMySell(listOwnerNFT);
            }
          });
        }
      }
    }
    fetchGetMySell();
  }, [isAuthenticated]);
  useEffect(() => {
    return () => {
      setDataMySell([]);
      setCurrentCategory("all");
    };
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
          ? dataMySell.map((item, index) => {
              return (
                <CardSell
                  key={index}
                  {...item}
                  share_address_wallet={share_address_wallet}
                />
              );
            })
          : dataMySell
              .filter((_item) => CurrentCategory === _item.type_nft)
              .map((item, index) => {
                return (
                  <CardSell
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
