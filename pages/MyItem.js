import React, { useState, useEffect } from "react";
import styles from "../styles/MyItem.module.css";
import CardMyItem from "../components/CardMyItem";
import { getOwnerNFTAPI } from "../api/owner-nft";
import { useUserState } from "../context/user";
import { getOwnerNftWeb3 } from "../web3/nft";
import { getOwnerNFTWeb3InstanceRandombox } from "../web3/randomBox";
import { useMoralis } from "react-moralis";
import ClipLoaderPage from "../components/ClipLoaderPage";
import EmptyData from "../components/EmptyData";
export default function MyItem() {
  const { share_address_wallet } = useUserState();
  const [dataMyItem, setDataMyItem] = useState([]);
  const { isAuthenticated } = useMoralis();
  const categories = ["All", "Animal", "Fruit", "Vegetable", "Chest"];
  const [CurrentCategory, setCurrentCategory] = useState("All");
  const [refrestFetchAPI, setRefrestFetchAPI] = useState(false);
  const [loading, setLoading] = useState(true);
  async function fetchGetOwnerNFT() {
    setLoading(true);
    if (isAuthenticated && share_address_wallet) {
      let responseWeb3 = await getOwnerNftWeb3(share_address_wallet);
      let responseAPI = await getOwnerNFTAPI(share_address_wallet);
      let responseWeb3RandomBox = await getOwnerNFTWeb3InstanceRandombox(
        share_address_wallet
      );
      if (responseWeb3RandomBox && !responseWeb3) {
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
                  setLoading(false);
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
          setLoading(false);
          setDataMyItem(
            responseWeb3RandomBox.sort(function (a, b) {
              if (parseInt(a.nft_id) > parseInt(b.nft_id)) return -1;
              if (parseInt(a.nft_id) < parseInt(b.nft_id)) return 1;
              return 0;
            })
          );
        }
      } else if (responseWeb3 && !responseWeb3RandomBox) {
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
                setLoading(false);
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
      } else if (responseWeb3 && responseWeb3RandomBox) {
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
                setLoading(false);
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
      } else {
        setLoading(false);
      }
    }
  }
  useEffect(() => {
    fetchGetOwnerNFT();
  }, [refrestFetchAPI, share_address_wallet]);
  useEffect(() => {
    return () => {
      setDataMyItem([]);
      setCurrentCategory("All");
    };
  }, []);
  return (
    <div className={styles.mainBG15}>
      <div className={styles.maincategory}>
      Category :
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
      ) : dataMyItem.length !== 0 ? (
        <div className={styles.mainMyItem}>
          {CurrentCategory == "All"
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
                .filter(
                  (_item) =>
                    CurrentCategory ===
                    _item.type_nft[0].toUpperCase() +
                      _item.type_nft.substring(1)
                )
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
      ) : (
        <EmptyData />
      )}
    </div>
  );
}
