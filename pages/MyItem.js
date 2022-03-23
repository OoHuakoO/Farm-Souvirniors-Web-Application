import React, { useState, useEffect } from "react";
import styles from "../styles/MyItem.module.css";
import CardMyItem from "../components/CardMyItem";
import { getOwnerNFTAPI } from "../api/owner-nft";
import { useUserState } from "../context/user";
import { getOwnerNftWeb3 } from "../web3/nft";
import { getOwnerNFTWeb3InstanceRandombox } from "../web3/randomBox";
import { useMoralis } from "react-moralis";
export default function MyItem() {
  const { share_address_wallet } = useUserState();
  const [dataMyItem, setDataMyItem] = useState([]);
  const { isAuthenticated } = useMoralis();
  const categories = ["all", "animal", "fruit", "vegetable", "chest"];
  const [CurrentCategory, setCurrentCategory] = useState("all");
  const [refrestFetchAPI, setRefrestFetchAPI] = useState(false);
  async function fetchGetOwnerNFT() {
    if (isAuthenticated && share_address_wallet) {
      let responseWeb3 = await getOwnerNftWeb3(share_address_wallet);
      let responseAPI = await getOwnerNFTAPI(share_address_wallet);
      let responseWeb3RandomBox = await getOwnerNFTWeb3InstanceRandombox(
        share_address_wallet
      );
      if (responseWeb3RandomBox && !responseWeb3) {
        console.log(responseWeb3RandomBox);
        if (responseAPI.data.length !== 0) {
          await responseWeb3RandomBox.map(
            async (dataFromSmartContract, indexFromSmartContract) => {
              await responseAPI.data.map((dataFromDB, indexFromDB) => {
                if (dataFromSmartContract.nft_id === dataFromDB.nft_id) {
                  dataFromSmartContract.status = dataFromDB.status;
                  dataFromSmartContract.from = "randombox";
                }
                if (
                  responseWeb3RandomBox.length - 1 === indexFromSmartContract &&
                  responseAPI.data.length - 1 === indexFromDB
                ) {
                  setDataMyItem(
                    responseWeb3RandomBox.sort(function (a, b) {
                      if (parseInt(a.nft_id) > parseInt(b.nft_id)) return -1;
                      if (parseInt(a.nft_id) < parseInt(b.nft_id)) return 1;
                      return 0;
                    })
                  );
                }
              });
            }
          );
        } else {
          setDataMyItem(
            responseWeb3RandomBox.sort(function (a, b) {
              if (parseInt(a.nft_id) > parseInt(b.nft_id)) return -1;
              if (parseInt(a.nft_id) < parseInt(b.nft_id)) return 1;
              return 0;
            })
          );
        }
      }
      if (responseWeb3 && !responseWeb3RandomBox) {
        await responseWeb3.map(
          async (dataFromSmartContract, indexFromSmartContract) => {
            await responseAPI.data.map((dataFromDB, indexFromDB) => {
              if (dataFromSmartContract.nft_id === dataFromDB.nft_id) {
                dataFromSmartContract.status = dataFromDB.status;
                dataFromSmartContract.from = "nft";
              }
              if (
                responseWeb3.length - 1 === indexFromSmartContract &&
                responseAPI.data.length - 1 === indexFromDB
              ) {
                setDataMyItem(
                  responseWeb3.sort(function (a, b) {
                    if (parseInt(a.nft_id) > parseInt(b.nft_id)) return -1;
                    if (parseInt(a.nft_id) < parseInt(b.nft_id)) return 1;
                    return 0;
                  })
                );
              }
            });
          }
        );
      }
      if (responseWeb3 && responseWeb3RandomBox) {
        let newResponseWeb3 = await responseWeb3.map((data) => {
          data.from = "nft";
          return data;
        });
        let newResponseWeb3RandomBox = await responseWeb3RandomBox.map(
          (data) => {
            data.from = "randombox";
            return data;
          }
        );
        let listOwnerNFT = newResponseWeb3RandomBox.concat(newResponseWeb3);
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
                setDataMyItem(
                  listOwnerNFT.sort(function (a, b) {
                    if (parseInt(a.nft_id) > parseInt(b.nft_id)) return -1;
                    if (parseInt(a.nft_id) < parseInt(b.nft_id)) return 1;
                    return 0;
                  })
                );
              }
            });
          }
        );
      }
    }
  }
  useEffect(() => {
    fetchGetOwnerNFT();
  }, [isAuthenticated, refrestFetchAPI]);
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
                  setRefrestFetchAPI={setRefrestFetchAPI}
                  refrestFetchAPI={refrestFetchAPI}
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
                    setRefrestFetchAPI={setRefrestFetchAPI}
                    refrestFetchAPI={refrestFetchAPI}
                    share_address_wallet={share_address_wallet}
                  />
                );
              })}
      </div>
    </div>
  );
}
