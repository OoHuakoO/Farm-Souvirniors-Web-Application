import React from 'react';
import styles from "../styles/BuyChests.module.css";
import Image from "next/image";
import Box1 from "../public/Box1.png";
import Ethereum from "../public/Ethereum-icon-purple.png";

const CardBuychests = (props) => {
  return (
    
      <div className={styles.CardBuyChests1}>
        <div className={styles.CardBuyChests2}>
          <div>
            <Image
              src={'/../public/'+ props.image}
              alt="Box1"
              width={200}
              automatically
              provided
              height={200}
              automatically
              provided
              blurDataURL="data:..."
              automatically
              provided
              placeholder="blur" // Optional blur-up while loading
            />
          </div>
          <div className={styles.typeBox}>
            <span>{props.balance}/{props.total} </span>
            <span> {props.name}</span>
            
          </div>
          <div className={styles.bnb}>
            <div>{props.price} ETH</div>
            <div>
              <Image
                src={Ethereum}
                alt="Ethereum"
                width={25}
                automatically
                provided
                height={25}
                automatically
                provided
                blurDataURL="data:..."
                automatically
                provided
                placeholder="blur" // Optional blur-up while loading
              />
            </div>
          </div>
          <div className={styles.buttonBuy}>buy</div>
        </div>
      </div>
    
  )
}

export default CardBuychests