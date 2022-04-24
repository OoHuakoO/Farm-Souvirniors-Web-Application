import React, { useState, useEffect } from "react";
import styles from "../styles/MyItem.module.css";
import CardSell from "../components/CardSell";
import { useUserState } from "../context/user";
import { getOwnerNftWeb3, getContractAddressNFT } from "../web3/nft";
import {
  getContractAddressRandomBox,
  getOwnerNFTWeb3InstanceRandombox,
} from "../web3/randomBox";
import { useMoralis } from "react-moralis";
import ClipLoaderPage from "../components/ClipLoaderPage";
import EmptyData from "../components/EmptyData";
export default function Sell() {
  const { share_address_wallet } = useUserState();
  const [dataMySell, setDataMySell] = useState([]);
  const { isAuthenticated } = useMoralis();
  const categories = ["all", "animal", "fruit", "vegetable", "chest"];
  const [CurrentCategory, setCurrentCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const fetchGetMySell = async () => {
    let listOwnerNFT = [];
    setLoading(true);
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
          if (data.seller === share_address_wallet) {
            listOwnerNFT.push({ ...data, from: "randombox" });
          }
          if (responseWeb3InstanceRandombox.length - 1 === index) {
            setLoading(false)
            setDataMySell(listOwnerNFT);
          }
        });
      }

     else if (responseWeb3 && !responseWeb3InstanceRandombox) {
        await responseWeb3.map(async (data, index) => {
          if (data.seller === share_address_wallet) {
            listOwnerNFT.push({ ...data, from: "nft" });
          }
          if (responseWeb3.length - 1 === index) {
            setLoading(false)
            setDataMySell(listOwnerNFT);
          }
        });
      }
     else if (responseWeb3 && responseWeb3InstanceRandombox) {
        let newResponseWeb3 = await responseWeb3.map((data) => {
          data.from = "nft";
          return data;
        });
        let newResponseWeb3RandomBox = await responseWeb3InstanceRandombox.map(
          (data) => {
            data.from = "randombox";
            return data;
          }
        );
        let listNFT = newResponseWeb3RandomBox.concat(newResponseWeb3);
        await listNFT.map(async (data, index) => {
          if (data.seller === share_address_wallet) {
            listOwnerNFT.push(data);
          }
          if (listNFT.length - 1 === index) {
            setLoading(false)
            setDataMySell(listOwnerNFT);
          }
        });
      }
      else{
        setLoading(false)
      }
    }
  };
  useEffect(() => {
    fetchGetMySell();
  }, [share_address_wallet]);
  useEffect(() => {
    return () => {
      setDataMySell([]);
      setCurrentCategory("all");
    };
  }, []);
  return (
    <div className={styles.mainBG15}>
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
      {loading ? (
        <ClipLoaderPage loading={loading} color="grey" />
      ) : dataMySell.length !== 0 ? (
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
      ) : <EmptyData />}
    </div>
  );
}
