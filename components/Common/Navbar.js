import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import Web3 from "web3";
import styles from "../../styles/Navbar.module.css";
export default function navbar() {
  const { authenticate, isAuthenticated, logout } = useMoralis();
  const [walletAddress, setWalletAddress] = useState();
  const getAddressWallet = async () => {
    const web3 = new Web3(
      Web3.givenProvider ||
        "https://ropsten.infura.io/v3/b0f95459c5a149cc9032a56d32fd1bdf"
    );
    const accounts = await web3.eth.requestAccounts();
    setWalletAddress(accounts[0]);
  };
  useEffect(() => {
    getAddressWallet();
  }, []);
  return (
    <div>
      <div className={styles.topnav} style={{ marginLeft: "15%" }}>
        <h1>FARM SOUVIRNIORS</h1>
        {isAuthenticated ? (
          <div>
            <p style={{ color: "white" }}>
              Connected to Address {walletAddress}
            </p>
            <div onClick={() => logout()} className={styles.buttonLogin}>
              <p>logout </p>
            </div>
          </div>
        ) : (
          <div onClick={() => authenticate()} className={styles.buttonLogin}>
            <p>Login</p>
          </div>
        )}
      </div>
    </div>
  );
}
