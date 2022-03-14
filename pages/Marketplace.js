import React, { useState, useEffect } from "react";
import styles from "../styles/MyItem.module.css";
import CardMarketplace from "../components/CardMarketplace";
import { useUserState } from "../context/user";
import { getOwnerNftWeb3, getContractAddressNFT } from "../web3/nft";
import {
  getContractAddressRandomBox,
  getOwnerRandomBox,
} from "../web3/randomBox";
import { useMoralis } from "react-moralis";
export default function Marketplace() {
  const { share_address_wallet } = useUserState();
  const [dataMarketplace, setDataMarketplace] = useState([]);
  const { isAuthenticated } = useMoralis();
  const categories = ["all", "animal", "fruit", "vegetable", "chest"];
  const [CurrentCategory, setCurrentCategory] = useState("all");
  useEffect(() => {
    async function fetchGetMySell() {
      if (isAuthenticated) {
        let responseContractAddress = await getContractAddressNFT();
        let responseContractAddressRandombox =
          await getContractAddressRandomBox();
        let responseWeb3 = await getOwnerNftWeb3(responseContractAddress);
        let responseWeb3RandomBox = await getOwnerRandomBox(
          responseContractAddressRandombox
        );
        if (responseWeb3RandomBox && !responseWeb3) {
          setDataMarketplace(responseWeb3RandomBox);
        }
        if (responseWeb3 && !responseWeb3RandomBox) {
          setDataMarketplace(responseWeb3);
        }
        if (responseWeb3 && responseWeb3RandomBox) {
          let listNFT = responseWeb3RandomBox.concat(responseWeb3);
          setDataMarketplace(listNFT);
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
          ? dataMarketplace.map((item, index) => {
              return (
                <CardMarketplace
                  key={index}
                  {...item}
                  share_address_wallet={share_address_wallet}
                />
              );
            })
          : dataMarketplace
              .filter((_item) => CurrentCategory === _item.type_nft)
              .map((item, index) => {
                return (
                  <CardMarketplace
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
