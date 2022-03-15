import React, { useState, useEffect } from "react";
import styles from "../styles/MyItem.module.css";
import CardMyItem from "../components/CardMyItem";
import { getOwnerNFTAPI } from "../api/owner-nft";
import { useUserState } from "../context/user";
import { getOwnerNftWeb3 } from "../web3/nft";
import { getOwnerRandomBox } from "../web3/randomBox";
import { useMoralis } from "react-moralis";
export default function MyItem() {
  const { share_address_wallet } = useUserState();
  const [dataMyItem, setDataMyItem] = useState([]);
  const { isAuthenticated } = useMoralis();
  const categories = ["all", "animal", "fruit", "vegetable", "chest"];
  const [CurrentCategory, setCurrentCategory] = useState("all");
  useEffect(() => {
    async function fetchGetOwnerNFT() {
      if (isAuthenticated && share_address_wallet) {
        let responseWeb3 = await getOwnerNftWeb3(share_address_wallet);
        let responseAPI = await getOwnerNFTAPI(share_address_wallet);
        let responseWeb3RandomBox = await getOwnerRandomBox(
          share_address_wallet
        );

        if (responseWeb3RandomBox && !responseWeb3) {
          await responseWeb3RandomBox.map(
            async (dataFromSmartContract, indexFromSmartContract) => {
              await responseAPI.data.map((dataFromDB, indexFromDB) => {
                if (dataFromSmartContract.nft_id === dataFromDB.nft_id) {
                  dataFromSmartContract.status = dataFromDB.status;
                }
                if (
                  responseWeb3RandomBox.length - 1 === indexFromSmartContract &&
                  responseAPI.data.length - 1 === indexFromDB
                ) {
                  setDataMyItem(responseWeb3RandomBox);
                }
              });
            }
          );
        }
        if (responseWeb3 && !responseWeb3RandomBox) {
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
                  setDataMyItem(responseWeb3);
                }
              });
            }
          );
        }
        if (responseWeb3 && responseWeb3RandomBox) {
          let listOwnerNFT = responseWeb3RandomBox.concat(responseWeb3);
          await listOwnerNFT.map(
            async (dataFromSmartContract, indexFromSmartContract) => {
              await responseAPI.data.map((dataFromDB, indexFromDB) => {
                if (dataFromSmartContract.nft_id === dataFromDB.nft_id) {
                  dataFromSmartContract.status = dataFromDB.status;
                }
                if (
                  listOwnerNFT.length - 1 === indexFromSmartContract &&
                  responseAPI.data.length - 1 === indexFromDB
                ) {
                  setDataMyItem(listOwnerNFT);
                }
              });
            }
          );
        }
      }
    }
    fetchGetOwnerNFT();
  }, [isAuthenticated]);
  useEffect(() => {
    return () => {
      setDataMyItem([]);
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
          ? dataMyItem.map((item, index) => {
              return (
                <CardMyItem
                  key={index}
                  {...item}
                  share_address_wallet={share_address_wallet}
                />
              );
            })
          : dataMyItem
              .filter((_item) => CurrentCategory === _item.type_nft)
              .map((item, index) => {
                return (
                  <CardMyItem
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
