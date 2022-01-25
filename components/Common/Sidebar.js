import React from "react";

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

      <div className="sidenav">
        <a href="/PlayGame">
          <span className="material-icons">sports_esports</span>Play Game
        </a>
        <a href="/Marketplace">
          {" "}
          <span className="material-icons">shopping_bag</span>Marketplace
        </a>
        <a href="/MyItem">
          <span className="material-icons">person</span>My Item
        </a>
      </div>
      <style jsx>
        {`
          .sidenav {
            height: 100%;
            width: 15%;
            position: fixed;
            z-index: 1;
            top: 0;
            left: 0;
            background-color: #2e373f;
            overflow-x: hidden;
            padding-top: 100px;
          }

          .sidenav a {
            font-family: 'Prompt', sans-serif;
            padding: 35px 6px 6px 50px;
            text-decoration: none;
            font-size: 20px;
            color: #ffffff;
            display: block;
            margin: auto;
          }

          .sidenav a:hover {
            color: #f1f1f1;
          }
        `}
      </style>
    </div>
  );
}
