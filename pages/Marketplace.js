import React, { useState, useEffect } from "react";
import styles from "../styles/MyItem.module.css";
import CardMarketplace from "../components/CardMarketplace";
import { useUserState } from "../context/user";
import { getOwnerNftWeb3, getContractAddressNFT } from "../web3/nft";
import {
  getContractAddressRandomBox,
  getOwnerNFTWeb3InstanceRandombox,
} from "../web3/randomBox";
import { useMoralis } from "react-moralis";
export default function Marketplace() {
  const { share_address_wallet } = useUserState();
  const [dataMarketplace, setDataMarketplace] = useState([]);
  const { isAuthenticated } = useMoralis();
  const categories = ["all", "animal", "fruit", "vegetable", "chest"];
  const [CurrentCategory, setCurrentCategory] = useState("all");
  useEffect(() => {
    async function fetchMarketplace() {
      let listNFT = [];
      if (isAuthenticated) {
        let responseContractAddress = await getContractAddressNFT();
        let responseContractAddressRandombox =
          await getContractAddressRandomBox();
        let responseWeb3 = await getOwnerNftWeb3(responseContractAddress);
        let responseWeb3InstanceRandombox =
          await getOwnerNFTWeb3InstanceRandombox(
            responseContractAddressRandombox
          );
        if (responseWeb3InstanceRandombox && !responseWeb3) {
          await responseWeb3InstanceRandombox.map(async (data, index) => {
            listNFT.push({ ...data, from: "randombox" });
            if (responseWeb3InstanceRandombox.length - 1 === index) {
              setDataMarketplace(listNFT);
            }
          });
        }
        if (responseWeb3 && !responseWeb3InstanceRandombox) {
          await responseWeb3.map(async (data, index) => {
            listNFT.push({ ...data, from: "nft" });
            if (responseWeb3.length - 1 === index) {
              setDataMarketplace(listNFT);
            }
          });
        }
        if (responseWeb3 && responseWeb3InstanceRandombox) {
          let newResponseWeb3 = await responseWeb3.map((data) => {
            data.from = "nft";
            return data;
          });
          let newResponseWeb3RandomBox =
            await responseWeb3InstanceRandombox.map((data) => {
              data.from = "randombox";
              return data;
            });
          let newListNFT = newResponseWeb3RandomBox.concat(newResponseWeb3);
          setDataMarketplace(newListNFT);
        }
      }
    }
    fetchMarketplace();
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
