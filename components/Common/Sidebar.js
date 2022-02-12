import React from "react";
import styles from "../../styles/Sidebar.module.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent
} from "react-pro-sidebar";

export default function Sidebar() {
  return (
    <div>
      <div className={styles.sidenav}>
        <a href="/PlayGame">
          <div className={styles.menuplaygame}>
            <span className="material-icons">sports_esports</span>
            <span> Play Game</span>
          </div>
        </a>
        <a href="/Marketplace">
        <div className={styles.menuplaygame}>
          <span className="material-icons">shopping_bag</span>
          <span>Marketplace</span>
          </div>
        </a>
        <a href="/MyItem">
        <div className={styles.menuplaygame}>
          <span className="material-icons">person</span>
          <span>My Item</span>
          </div>
        </a>
        
      </div>
    </div>
  );
}
