import Image from "next/image";
import binance from "../../public/binance.png";
import exchange from "../../public/Exchange.svg";
import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import styles from "../../styles/Navbar.module.css";
import { useRouter } from "next/router";
import { Login } from "../../api/user";
import { useUserState } from "../../context/user";
import Config from "../../config";
import Web3 from "web3";
import Link from "next/link";
export default function Navbar() {
  const router = useRouter();
  const { authenticate, isAuthenticated, logout } = useMoralis();
  const [walletAddress, setWalletAddress] = useState();
  const { setShare_Address_wallet } = useUserState();
  const getAddressWallet = async () => {
    const web3 = new Web3(Web3.givenProvider || Config.web3ProviderGanache);
    const accounts = await web3.eth.requestAccounts();
    let accountsFormat =
      accounts[0].substring(0, 5) +
      "..." +
      accounts[0].substring(accounts[0].length - 4 , accounts[0].length);
    setWalletAddress(accountsFormat);
    setShare_Address_wallet(accounts[0]);
  };

  const loginUser = async () => {
    if (window.web3) {
      const authen = await authenticate();
      if (authen) {
        const web3 = new Web3(Web3.givenProvider || Config.web3ProviderGanache);
        const accounts = await web3.eth.requestAccounts();
        await Login(accounts[0]);
        router.push({
          pathname: "/PlayGame",
        });
      }
    } else {
      window.alert(" You should consider trying to install metamask");
    }
  };
  const logoutUser = async () => {
    await logout();
    router.push({
      pathname: "/",
    });
  };
  useEffect(() => {
    const init = async () => {
      if (window.web3) {
        getAddressWallet();
        window.ethereum.on("accountsChanged", function (accounts) {
          logoutUser();
        });
        window.ethereum.on("networkChanged", function (networkId) {
          logoutUser();
        });
      } else {
        window.alert(" You should consider trying to install metamask");
      }
    };
    init();
  }, []);
  useEffect(() => {
    if (window.web3) {
      getAddressWallet();
    }
  }, [isAuthenticated]);
  return (
    <div className={styles.navbarLayout}>
      {/* Nav-left */}
      <div className={styles.munuNavbarLeft}>
        {isAuthenticated ? (
          <h1
            onClick={() => {
              router.push({
                pathname: "/PlayGame",
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
                <Image src={binance} alt="binance" width={20} height={20} />
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
              loginUser();
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
