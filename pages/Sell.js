import React, { useState, useEffect } from "react";
import styles from "../styles/MyItem.module.css";
import CardSell from "../components/CardSell";
import { useUserState } from "../context/user";
import { getOwnerNftWeb3, getContractAddressNFT } from "../web3/nft";
import {
  getContractAddressRandomBox,
  getOwnerRandomBox,
} from "../web3/randomBox";
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
        let responseContractAddress = await getContractAddressNFT();
        let responseContractAddressRandombox =
          await getContractAddressRandomBox();
        let responseWeb3 = await getOwnerNftWeb3(responseContractAddress);
        let responseWeb3RandomBox = await getOwnerRandomBox(
          responseContractAddressRandombox
        );
        if (responseWeb3RandomBox && !responseWeb3) {
          if (data.seller === share_address_wallet) {
            setDataMySell(responseWeb3RandomBox);
          }
        }

        if (responseWeb3 && !responseWeb3RandomBox) {
          await responseWeb3.map(async (data, index) => {
            if (data.seller === share_address_wallet) {
              listOwnerNFT.push(data);
            }
            if (responseWeb3.length - 1 === index) {
              setDataMySell(listOwnerNFT);
            }
          });
        }
        if (responseWeb3 && responseWeb3RandomBox) {
          let listNFT = responseWeb3RandomBox.concat(responseWeb3);
          await listNFT.map(async (data, index) => {
            if (data.seller === share_address_wallet) {
              listOwnerNFT.push(data);
            }
            if (listNFT.length - 1 === index) {
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
