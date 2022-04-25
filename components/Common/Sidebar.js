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
            <a>
              <div className={styles.menuplaygame}>
                <span className="material-icons">sports_esports</span>
                <span> Play Game</span>
              </div>
            </a>
          </Link>
          <Link href="/BuyChests">
            <a>
              <div className={styles.menuplaygame}>
                <span className="material-icons">home_repair_service</span>
                <span>Buy Chests</span>
              </div>
            </a>
          </Link>
          <Link href="/Marketplace">
            <a>
              <div className={styles.menuplaygame}>
                <span className="material-icons">shopping_bag</span>
                <span>Marketplace</span>
              </div>
            </a>
          </Link>
          <Link href="/MyItem">
            <a>
              <div className={styles.menuplaygame}>
                <span className="material-icons">person</span>
                <span>My Item</span>
              </div>
            </a>
          </Link>
          <Link href="/Sell">
            <a>
              <div className={styles.menuplaygame}>
                <span className="material-icons">sell</span>
                <span>Sell</span>
              </div>
            </a>
          </Link>
          <Link href="/Craft">
            <a>
              <div className={styles.menuplaygame}>
                <span className="material-icons">psychology</span>
                <span>Craft</span>
              </div>
            </a>
          </Link>
        
        </div>
      ) : null}
    </div>
  );
}
