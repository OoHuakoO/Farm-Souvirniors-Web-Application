import React from "react";

export default function navbar() {
  return (
    <div>
      <div className="topnav" style={{ marginLeft: "15%" }}>
        <h1>FARM SOUVIRNIORS</h1>
        <div className="buttonLogin">
          <p>Login</p>
        </div>
      </div>

      <style jsx>
        {`
          .buttonLogin {
            height: 30px;
            width: 50px;
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
