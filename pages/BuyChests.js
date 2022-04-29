import React, { useState, useEffect } from "react";
import styles from "../styles/BuyChests.module.css";
import CardBuychests from "../components/CardBuyChests";
import { useUserState } from "../context/user";
import { mintRandomBox, getRandomBox } from "../web3/randomBox";
import { useMoralis } from "react-moralis";
import ClipLoaderPage from "../components/ClipLoaderPage";
export default function BuyChests() {
  const { share_address_wallet } = useUserState();
  const [listRandomBox, setListRandomBox] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useMoralis();
  const handleMintRandomBox = async () => {
    // Animal chest
    await mintRandomBox(
      share_address_wallet,
      "animal chests",
      "0.01",
      100,
      "https://res.cloudinary.com/smilejob/image/upload/v1650294244/Farm-Souvirniors/IMG_2345_balm7t.png"
    );
    // Fruit Chest
    // await mintRandomBox(
    //   share_address_wallet,
    //   "fruit chests",
    //   "0.01",
    //   100,
    //   "https://res.cloudinary.com/smilejob/image/upload/v1650294244/Farm-Souvirniors/IMG_2350_in5klp.png"
    // );
    // Vegetable Chest
    // await mintRandomBox(
    //   share_address_wallet,
    //   "vegetable chests",
    //   "0.01",
    //   100,
    //   "https://res.cloudinary.com/smilejob/image/upload/v1650294244/Farm-Souvirniors/IMG_2343_gqgy55.png"
    // );
  };
  const fetctGetRandomBox = async () => {
    setLoading(true);
    let response = await getRandomBox();
    if (response) {
      setLoading(false);
      setListRandomBox(response);
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetctGetRandomBox();
    return () => {
      setListRandomBox([]);
    };
  }, [isAuthenticated]);
  return (
    <div className={styles.mainBG15}>
      {loading ? (
        <ClipLoaderPage loading={loading} color="grey" />
      ) : (
        <div className={styles.BuyChestsPages}>
          {/* <div
            onClick={() => {
              handleMintRandomBox();
            }}
          >
            Mint
          </div> */}

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
      )}
    </div>
  );
}
