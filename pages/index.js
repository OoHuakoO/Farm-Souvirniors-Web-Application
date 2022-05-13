import React, { useEffect } from "react";
import styles from "../styles/Index.module.css";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import Image from "next/image";
import BGFarm from "../public/BGGame.png";

const index = () => {
  const router = useRouter();
  const { authenticate, isAuthenticated, logout } = useMoralis();

  return (
    <div className={styles.homemain}>
      {isAuthenticated ? null : (
        <>
          <div>
            <div className={styles.homeWelcomeImage}>
              <Image
                // height="100%"
                // width="100%"
                layout="fill"
                objectFit="cover"
                objectPosition="top"
                src={BGFarm}
                alt="BGFarm"
              />
            </div>
          </div>
          {/* <div className={styles.buttonLogin}>Login</div> */}
        </>
      )}
    </div>
  );
};

export default index;
