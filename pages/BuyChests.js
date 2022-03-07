import React, { useState, useEffect } from "react";
import styles from "../styles/BuyChests.module.css";
import CardBuychests from "../components/CardBuyChests";
import { useUserState } from "../context/user";
import { mintRandomBox, getRandomBox } from "../web3/index";
import { useMoralis } from "react-moralis";
export default function BuyChests() {
  const { share_address_wallet } = useUserState();
  const [listRandomBox, setListRandomBox] = useState([]);
  const { isAuthenticated } = useMoralis();
  const handleMintRandomBox = async () => {
    // Animal chest
    await mintRandomBox(
      share_address_wallet,
      "Animal Chests",
      "0.01",
      100,
      "https://res.cloudinary.com/smilejob/image/upload/v1645697086/Farm-Souvirniors/animal-chest_waxfph.png"
    );
    // Fruit Chest
    // await mintRandomBox(
    //   share_address_wallet,
    //   "Fruit Chests",
    //   "0.01",
    //   100,
    //   "https://res.cloudinary.com/smilejob/image/upload/v1645697085/Farm-Souvirniors/fruit-chest_mx58t4.png"
    // );
    // Vegetable Chest
    // await mintRandomBox(
    //   share_address_wallet,
    //   "Vegetable Chests",
    //   "0.01",
    //   100,
    //   "https://res.cloudinary.com/smilejob/image/upload/v1645697085/Farm-Souvirniors/vegatable-chest_idssx9.png"
    // );
  };
  useEffect(() => {
    async function fetctGetRandomBox() {
      let response = await getRandomBox();
      if (response) {
        setListRandomBox(response);
      }
    }
    fetctGetRandomBox();
    return () => {
      setListRandomBox([]);
    };
  }, [isAuthenticated]);
  return (
    <div className={styles.BuyChestsPages}>
      <div
        onClick={() => {
          handleMintRandomBox();
        }}
      >
        Mint
      </div>
      {listRandomBox.map((item, index) => {
        return (
          <CardBuychests
            key={index}
            {...item}
            share_address_wallet={share_address_wallet}
          />
        );
      })}
    </div>
  );
}
