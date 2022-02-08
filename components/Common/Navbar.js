import Image from "next/image";
import binance from "../../public/binance-coin-bnb-logo.png";
import exchange from "../../public/Exchange.svg";
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
    <div className={styles.navbarLayout}>
      {/* Nav-left */}
      <div  className={styles.munuNavbarLeft}>
        <h1>FARM SOUVIRNIORS</h1>
      </div>
      {/* Nav-right */}
      <div>
        {isAuthenticated ? (
          <div className={styles.munuNavbarRight}>
            <div className={styles.buttonNavbarConnected}>
              <div>
                <Image
                  src={binance}
                  alt="binance"
                  width={20}
                  automatically
                  provided
                  height={20}
                  automatically
                  provided
                  blurDataURL="data:..."
                  automatically
                  provided
                  placeholder="blur" // Optional blur-up while loading
                />
              </div>
              <div>Connected to Address {walletAddress}</div>
            </div>
            <div className={[styles.buttonNavbar, styles.buttonNavbarConnected].join(" ")}>
              <div >
                <Image
                  src={exchange}
                  alt="exchange"
                  width={15}
                  automatically
                  provided
                  height={15}
                  automatically
                  provided
                  blurDataURL="data:..."
                  automatically
                  provided
                  placeholder="blur" // Optional blur-up while loading
                />
              </div>
              Exchange
            </div>
            <div
              onClick={() => logout()}
              className={[styles.buttonNavbar, styles.logout].join(" ")}
            >
              Logout
            </div>
          </div>
        ) : (
          <div onClick={() => authenticate()} className={styles.buttonNavbar}>
            Login
          </div>
        )}
      </div>
    </div>
  );
  // return (
  //   <div className={styles.navbarLayout}>
  //     <div className={styles.topnav} >
  //       <h1>FARM SOUVIRNIORS</h1>
  //       <div className={styles.rightNavbar}>
  //       {isAuthenticated ? (
  //         <div>
  //           <p style={{ color: "white" }}>
  //             Connected to Address {walletAddress}
  //           </p>
  //           <div onClick={() => logout()} className={styles.buttonLogin}>
  //             <p>logout </p>
  //           </div>
  //         </div>
  //       ) : (
  //         <div onClick={() => authenticate()} className={styles.buttonLogin}>
  //           <p>Login</p>
  //         </div>
  //       )}
  //       </div>
  //     </div>
  //   </div>
  // );
}
