import React, { useState, useEffect } from "react";
import { Deposit } from "../components/Deposit";
import { Withdraw } from "../components/Withdraw";
import styles from "../styles/Exchange.module.css";
import { useUserState } from "../context/user";
import { getDataUser } from "../api/user";
export default function Exchange() {
  const { share_address_wallet } = useUserState();
  const [CurrentTab, setCurrentTab] = useState(1);
  const [dataResource, setDataResource] = useState();
  const [refrestFetchAPI, setRefrestFetchAPI] = useState(false);
  const changeTab = (index) => {
    setCurrentTab(index);
  };
  const handleGetDataUser = async () => {
    if (share_address_wallet) {
      let response = await getDataUser(share_address_wallet);
      setDataResource(response.data.resource);
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
        />
      );
    } else if (CurrentTab == 1) {
      return (
        <Withdraw
          setRefrestFetchAPI={setRefrestFetchAPI}
          refrestFetchAPI={refrestFetchAPI}
          share_address_wallet={share_address_wallet}
          dataResource={dataResource}
        />
      );
    }
  };
  useEffect(() => {
    handleGetDataUser();
  }, [refrestFetchAPI, share_address_wallet]);
  return (
    <div>
      <div className={styles.topicSelecyExchage}>
        <button
          className={
            CurrentTab === 0
              ? styles.buttonCategoryActive
              : styles.buttonCategory
          }
          onClick={() => changeTab(0)}
        >
          Deposit
        </button>
        <button
          className={
            CurrentTab === 1
              ? styles.buttonCategoryActive
              : styles.buttonCategory
          }
          onClick={() => changeTab(1)}
        >
          withdraw
        </button>
      </div>

      <SwapTab />
    </div>
  );
}
