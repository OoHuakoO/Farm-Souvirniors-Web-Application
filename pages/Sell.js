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
  useEffect(() => {
    async function fetchGetMySell() {
      console.log(share_address_wallet);
      let listOwnerNFT = [];
      if (isAuthenticated) {
        let responseContractAddress = await getContractAddress();
        let responseWeb3 = await getOwnerNftWeb3(responseContractAddress);

        if (responseWeb3) {
          await responseWeb3.map(async (data, index) => {
            if (data.seller === share_address_wallet) {
              console.log(data.seller);
              console.log(share_address_wallet);
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
