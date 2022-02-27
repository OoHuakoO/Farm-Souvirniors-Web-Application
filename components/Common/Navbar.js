import Image from "next/image";
import Ethereum from "../../public/Ethereum-icon-purple.png";
import exchange from "../../public/Exchange.svg";
import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import styles from "../../styles/Navbar.module.css";
import { getContract, craftNFT } from "../../web3";
import { useUserState } from "../../context/user";
import Web3 from "web3";
import Link from "next/link";
export default function navbar() {
  const { authenticate, isAuthenticated, logout } = useMoralis();
  const [walletAddress, setWalletAddress] = useState();
  const getAddressWallet = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
    const accounts = await web3.eth.requestAccounts();
    await localStorage.setItem("address_wallet", accounts[0]);
    setWalletAddress(accounts[0]);
  };
  const logoutUser = () => {
    localStorage.removeItem("address_wallet");
    logout();
    window.location.reload();
  };
  useEffect(() => {
    getContract();
    getAddressWallet();
    window.ethereum.on("accountsChanged", function (accounts) {
      logoutUser();
    });
    window.ethereum.on("networkChanged", function (networkId) {
      logoutUser();
    });
  }, []);
  useEffect(() => {
    getAddressWallet();
  }, [isAuthenticated]);
  return (
    <div className={styles.navbarLayout}>
      {/* Nav-left */}
      <div className={styles.munuNavbarLeft}>
        <h1>FARM SOUVIRNIORS</h1>
      </div>
      {/* Nav-right */}
      <div>
        {isAuthenticated ? (
          <div className={styles.munuNavbarRight}>
            <div className={styles.buttonNavbarConnected}>
              <div>
                <Image
                  src={Ethereum}
                  alt="Ethereum"
                  width={25}
                  height={25}
                  blurDataURL="data:..."
                  placeholder="blur" // Optional blur-up while loading
                />
              </div>
              <div>Connected to Address {walletAddress}</div>
            </div>
            <Link href="/Exchange">
            <div
              className={[
                styles.buttonNavbar,
                styles.buttonNavbarConnected,
              ].join(" ")}
            >
              <div>
                <Image
                  className={styles.exchangeSVG}
                  src={exchange}
                  alt="exchange"
                  width={15}
                  height={15}
                />
              </div>
              Exchange
            </div>
            </Link>
            <div
              onClick={() => {
                logoutUser();
              }}
              className={[styles.buttonNavbar, styles.logout].join(" ")}
            >
              Logout
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              authenticate();
            }}
            className={styles.buttonNavbar}
          >
            Login
          </div>
        )}
      </div>
    </div>
  );
}
