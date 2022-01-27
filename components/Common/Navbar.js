import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import Web3 from "web3";
export default function navbar() {
  const { authenticate, isAuthenticated, logout } = useMoralis();
  const [walletAddress, setWalletAddress] = useState();
  const getAddressWallet = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const accounts = await web3.eth.requestAccounts();
    setWalletAddress(accounts[0]);
  };
  useEffect(() => {
    getAddressWallet();
  }, []);
  return (
    <div>
      <div className="topnav" style={{ marginLeft: "15%" }}>
        <h1>FARM SOUVIRNIORS</h1>

        {isAuthenticated ? (
          <div>
            <p style={{ color: "white" }}>Connected to Address {walletAddress}</p>
            <div onClick={() => logout()} className="buttonLogin">
              <p>logout </p>
            </div>
          </div>
        ) : (
          <div onClick={() => authenticate()} className="buttonLogin">
            <p>Login</p>
          </div>
        )}
      </div>

      <style jsx>
        {`
          .buttonLogin {
            height: 50%;
            width: 20%;
            background-color: red;
            margin-left: 100px;
          }
          .topnav {
            overflow: hidden;
            background-color: #272c32;
            display: flex;
            flex-direction: row;
          }

          .topnav h1 {
            float: left;
            color: #ffffff;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
            font-family: "Prompt", sans-serif;
            font-style: normal;
            font-weight: bold;
            font-size: 24px;
            line-height: 36px;
          }

          .topnav h1:hover {
            background-color: #272c32;
            color: #ffffff;
          }

          .topnav h1.active {
            background-color: #04aa6d;
            color: white;
          }
        `}
      </style>
    </div>
  );
}
