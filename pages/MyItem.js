import React, { useState, useEffect } from "react";
import styles from "../styles/MyItem.module.css";
import CardMyItem from "../components/CardMyItem";
import { getOwnerNFTAPI } from "../api/owner-nft";
import { useUserState } from "../context/user";
import { getOwnerNftWeb3 } from "../web3/index";
import { useMoralis } from "react-moralis";
export default function MyItem() {
  const { address_wallet } = useUserState();
  const [dataMyItem, setDataMyItem] = useState([]);
  const { authenticate, isAuthenticated, logout } = useMoralis();
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
  useEffect(() => {
    async function fetchGetOwnerNFT() {
      if (isAuthenticated) {
        let responseWeb3 = await getOwnerNftWeb3(address_wallet);
        let responseAPI = await getOwnerNFTAPI(address_wallet);
        if (responseWeb3) {
          await responseWeb3.map(
            async (dataFromSmartContract, indexFromSmartContract) => {
              await responseAPI.data.map((dataFromDB, indexFromDB) => {
                if (dataFromSmartContract.nft_id === dataFromDB.nft_id) {
                  dataFromSmartContract.status = dataFromDB.status;
                }
                if (
                  responseWeb3.length - 1 === indexFromSmartContract &&
                  responseAPI.data.length - 1 === indexFromDB
                ) {
                  console.log(responseWeb3);
                  setDataMyItem(responseWeb3);
                }
              });
            }
          );
        }
      }
    }
    fetchGetOwnerNFT();
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
          ? dataMyItem.map((item, index) => {
              return <CardMyItem key={index} {...item} />;
            })
          : dataMyItem
              .filter((_item) => CurrentCategory === _item.type_nft)
              .map((item, index) => {
                return <CardMyItem key={index} {...item} />;
              })}
      </div>
    </div>
  );
}
