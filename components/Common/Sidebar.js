import React, { useEffect, useState } from "react";
import styles from "../../styles/Sidebar.module.css";
import Link from "next/link";
import { useMoralis } from "react-moralis";
export default function Sidebar() {
  const { authenticate, isAuthenticated, logout } = useMoralis();
  return (
    <div>
      {isAuthenticated ? (
        <div className={styles.sidenav}>
          <Link href="/PlayGame">
            {window.location.href.includes("PlayGame") ? (
              <a className={styles.boxNavPress}>
                <div className={styles.menuplaygame}>
                  <span className="material-icons">sports_esports</span>
                  <span> Play Game</span>
                </div>
              </a>
            ) : (
              <a className={styles.boxNavNormal}>
                <div className={styles.menuplaygame}>
                  <span className="material-icons">sports_esports</span>
                  <span> Play Game</span>
                </div>
              </a>
            )}
          </Link>
          <Link href="/BuyChests">
            {window.location.href.includes("BuyChests") ? (
              <a className={styles.boxNavPress}>
                <div className={styles.menuplaygame}>
                  <span className="material-icons">view_in_ar</span>
                  <span>Buy Chests</span>
                </div>
              </a>
            ) : (
              <a className={styles.boxNavNormal}>
                <div className={styles.menuplaygame}>
                  <span className="material-icons">view_in_ar</span>
                  <span>Buy Chests</span>
                </div>
              </a>
            )}
          </Link>
          <Link href="/Marketplace">
            {window.location.href.includes("Marketplace") ? (
              <a className={styles.boxNavPress}>
                <div className={styles.menuplaygame}>
                  <span className="material-icons">shopping_bag</span>
                  <span>Marketplace</span>
                </div>
              </a>
            ) : (
              <a className={styles.boxNavNormal}>
                <div className={styles.menuplaygame}>
                  <span className="material-icons">shopping_bag</span>
                  <span>Marketplace</span>
                </div>
              </a>
            )}
          </Link>
          <Link href="/MyItem">
            {window.location.href.includes("MyItem") ? (
              <a className={styles.boxNavPress}>
                <div className={styles.menuplaygame}>
                  <span className="material-icons">person</span>
                  <span>My Items</span>
                </div>
              </a>
            ) : (
              <a className={styles.boxNavNormal}>
                <div className={styles.menuplaygame}>
                  <span className="material-icons">person</span>
                  <span>My Items</span>
                </div>
              </a>
            )}
          </Link>
          <Link href="/Sell">
            {window.location.href.includes("Sell") ? (
              <a className={styles.boxNavPress}>
                <div className={styles.menuplaygame}>
                  <span className="material-icons">sell</span>
                  <span>Sell</span>
                </div>
              </a>
            ) : (
              <a className={styles.boxNavNormal}>
                <div className={styles.menuplaygame}>
                  <span className="material-icons">sell</span>
                  <span>Sell</span>
                </div>
              </a>
            )}
          </Link>
          <Link href="/Craft">
            {window.location.href.includes("Craft") ? (
              <a className={styles.boxNavPress}>
                <div className={styles.menuplaygame}>
                  <span className="material-icons">psychology</span>
                  <span>Craft</span>
                </div>
              </a>
            ) : (
              <a className={styles.boxNavNormal}>
                <div className={styles.menuplaygame}>
                  <span className="material-icons">psychology</span>
                  <span>Craft</span>
                </div>
              </a>
            )}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
