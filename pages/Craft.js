import React, { useState, useEffect } from "react";
import CardCraft from "../components/CardCraft";
import styles from "../styles/MyItem.module.css";
import { getInfoNFT } from "../api/info-nft";
import { getDataUser } from "../api/user";
import { useUserState } from "../context/user";
import CardInventories from "../components/CardInventories";
import { useMoralis } from "react-moralis";
import ClipLoaderPage from "../components/ClipLoaderPage";
export default function Craft() {
  const { share_address_wallet } = useUserState();
  const [dataCraft, setDataCraft] = useState([]);
  const [dataResource, setDataResource] = useState();
  const categories = ["All", "Animal", "Fruit", "Vegetable"];
  const [CurrentCategory, setCurrentCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useMoralis();
  const handleGetDataUser = async () => {
    if (share_address_wallet) {
      let response = await getDataUser(share_address_wallet);
      setDataResource(response.data.resource);
    }
  };
  const fetchGetInfoNFT = async () => {
    setLoading(true);
    let response = await getInfoNFT();
    setLoading(false);
    setDataCraft(response.data);
  };
  useEffect(() => {
    fetchGetInfoNFT();
    return () => {
      setDataCraft([]);
      setCurrentCategory("All");
    };
  }, []);
  useEffect(() => {
    handleGetDataUser();
  }, [isAuthenticated, share_address_wallet]);
  return (
    <div className={styles.mainBG15}>
      <div className={styles.maincategoryInventories}>
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

        <CardInventories dataResource={dataResource} />
      </div>
      {loading ? (
        <ClipLoaderPage loading={loading} color="grey" />
      ) : (
        <div className={styles.mainMyItem}>
          {CurrentCategory == "All"
            ? dataCraft.map((item, index) => {
                return (
                  <CardCraft
                    key={index}
                    {...item}
                    share_address_wallet={share_address_wallet}
                  />
                );
              })
            : dataCraft
                .filter(
                  (_item) =>
                    CurrentCategory ===
                    _item.type_nft[0].toUpperCase() +
                      _item.type_nft.substring(1)
                )
                .map((item, index) => {
                  return (
                    <CardCraft
                      key={index}
                      {...item}
                      share_address_wallet={share_address_wallet}
                    />
                  );
                })}
        </div>
      )}
    </div>
  );
}
