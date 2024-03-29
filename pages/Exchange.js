import React, { useState, useEffect } from "react";
import { Deposit } from "../components/Deposit";
import { Withdraw } from "../components/Withdraw";
import styles from "../styles/Exchange.module.css";
import { useUserState } from "../context/user";
import { getDataUser } from "../api/user";
import { balanceOfSteak } from "../web3/steakToken";
import { balanceOfFurniture } from "../web3/furnitureToken";
import { balanceOfWine } from "../web3/wineToken";
export default function Exchange() {
  const { share_address_wallet } = useUserState();
  const [CurrentTab, setCurrentTab] = useState(1);
  const [dataResource, setDataResource] = useState();
  const [dataBalance, setDataBalance] = useState();
  const [refrestFetchAPI, setRefrestFetchAPI] = useState(false);
  const [loading, setLoading] = useState(false);
  const changeTab = (index) => {
    setCurrentTab(index);
  };
  const handleGetDataUser = async () => {
    if (share_address_wallet) {
      setLoading(true);
      let balanceOfSteakToken = await balanceOfSteak(share_address_wallet);
      let balanceOfFurnitureToken = await balanceOfFurniture(
        share_address_wallet
      );
      let balanceOfWineToken = await balanceOfWine(share_address_wallet);
      let response = await getDataUser(share_address_wallet);
      setDataResource(response.data.resource);
      setDataBalance({
        balanceOfSteakToken:  balanceOfSteakToken,
        balanceOfFurnitureToken:  balanceOfFurnitureToken,
        balanceOfWineToken:  balanceOfWineToken,
      });
      setLoading(false);
    }
  };
  const SwapTab = () => {
    if (CurrentTab == 0) {
      return (
        <Deposit
          setRefrestFetchAPI={setRefrestFetchAPI}
          refrestFetchAPI={refrestFetchAPI}
          share_address_wallet={share_address_wallet}
          dataResource={dataResource}
          dataBalance={dataBalance}
          loading={loading}
        />
      );
    } else if (CurrentTab == 1) {
      return (
        <Withdraw
          setRefrestFetchAPI={setRefrestFetchAPI}
          refrestFetchAPI={refrestFetchAPI}
          share_address_wallet={share_address_wallet}
          dataResource={dataResource}
          dataBalance={dataBalance}
          loading={loading}
        />
      );
    }
  };
  useEffect(() => {
    handleGetDataUser();
  }, [refrestFetchAPI, share_address_wallet]);
  return (
    <div className={styles.mainBG15}>
      <div className={styles.topicSelecyExchage}>
        <button
          className={
            CurrentTab === 0
              ? styles.buttonCategoryActive
              : styles.buttonCategory
          }
          onClick={() => changeTab(0)}
        >
          DEPOSIT
        </button>
        <button
          className={
            CurrentTab === 1
              ? styles.buttonCategoryActive
              : styles.buttonCategory
          }
          onClick={() => changeTab(1)}
        >
          WITHDRAW
        </button>
      </div>

      <SwapTab />
    </div>
  );
}
