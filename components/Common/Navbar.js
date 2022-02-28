import Image from "next/image";
import Ethereum from "../../public/Ethereum-icon-purple.png";
import exchange from "../../public/Exchange.svg";
import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import styles from "../../styles/Navbar.module.css";
import { craftNFTWeb3 } from "../../web3/index";
import { useRouter } from "next/router";
import { Login } from "../../api/user";
import Web3 from "web3";
import Link from "next/link";
export default function Navbar() {
  const router = useRouter();
  const { authenticate, isAuthenticated, logout } = useMoralis();
  const [walletAddress, setWalletAddress] = useState();
  const craft = async () => {
    await craftNFTWeb3(
      "corn",
      "https://res.cloudinary.com/smilejob/image/upload/v1644302035/Farm-Souvirniors/Corn_dl4f2a.png",
      5,
      "animal",

      10,
      10,

      5,
      5,
      "0x629812063124cE2448703B889D754b232B3622BA"
    );
  };
  const getAddressWallet = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
    const accounts = await web3.eth.requestAccounts();
    await localStorage.setItem("address_wallet", accounts[0]);
    setWalletAddress(accounts[0]);
  };
  const loginUser = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
    const accounts = await web3.eth.requestAccounts();
    await Login(accounts[0]);
  };
  const logoutUser = () => {
    localStorage.removeItem("address_wallet");
    logout();
    router.push({
      pathname: "/",
    });
  };
  useEffect(() => {
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
        <h1 onClick={() => craft()}>craft</h1>
        {isAuthenticated ? (
          <h1
            onClick={() => {
              router.push({
                pathname: "/BuyChests",
              });
            }}
            style={{ cursor: "pointer" }}
          >
            FARM SOUVIRNIORS
          </h1>
        ) : (
          <h1
            onClick={() => {
              router.push({
                pathname: "/",
              });
            }}
            style={{ cursor: "pointer" }}
          >
            FARM SOUVIRNIORS
          </h1>
        )}
      </div>
      {/* Nav-right */}
      <div>
        {isAuthenticated ? (
          <div className={styles.munuNavbarRight}>
            <div className={styles.buttonNavbarConnected}>
              <div>
                <Image src={Ethereum} alt="Ethereum" width={25} height={25} />
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
            onClick={async () => {
              await authenticate();
              loginUser();
              router.push({
                pathname: "/BuyChests",
              });
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
