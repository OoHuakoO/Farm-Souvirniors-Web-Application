import React from "react";
import styles from "../../styles/Sidebar.module.css";

export default function Sidebar() {
  return (
    <div>
      {/* sidebar */}
      {/* <div
        className="w3-sidebar w3-light-grey w3-bar-block"
        style={{ width: "15%" }}
      >
        <h3 className="w3-bar-item">Menu</h3>
        <a href="/PlayGame" className="w3-bar-item w3-button">
          Play Game
        </a>
        <a href="/Marketplace" className="w3-bar-item w3-button">
          Marketplace
        </a>
        <a href="/MyItem" className="w3-bar-item w3-button">
          My Item
        </a>
      </div> */}

      <div className={styles.sidenav}>
        <a href="/PlayGame">
          <span className="material-icons">sports_esports</span>
         <span> Play Game</span>
        </a>
        <a href="/Marketplace">
          {" "}
          <span className="material-icons">shopping_bag</span>
          <span>Marketplace</span>
        </a>
        <a href="/MyItem">
          <span className="material-icons">person</span>
          <span>My Item</span>
        </a>
      </div>
      
    </div>
  );
}
