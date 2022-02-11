import React from "react";
import styles from "../styles/BuyChests.module.css";
import Image from "next/image";
import Box1 from "../public/Box1.png";
import Ethereum from "../public/Ethereum-icon-purple.png";

export default function BuyChests() {
  const cardBuyChest  = [ ]
  return (
    <div className={styles.BuyChestsPages}>
      <div className={styles.CardBuyChests1}>
        <div className={styles.CardBuyChests2}>
          <div>
            <Image
              src={Box1}
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
          <div className={styles.typeBox}>3000/3000 Animal Chests</div>
          <div className={styles.bnb}>
            <div> 1 ETH </div>
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

      {/* 2 */}
      <div className={styles.CardBuyChests1}>
        <div className={styles.CardBuyChests2}>
          <div>
            <Image
              src={Box1}
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
          <div className={styles.typeBox}>3000/3000 Animal Chests</div>
          <div className={styles.bnb}>
            <div> 1 ETH </div>
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

      {/* 3 */}
      <div className={styles.CardBuyChests1}>
        <div className={styles.CardBuyChests2}>
          <div>
            <Image
              src={Box1}
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
          <div className={styles.typeBox}>3000/3000 Animal Chests</div>
          <div className={styles.bnb}>
            <div> 1 ETH </div>
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
    </div>
  );
}
