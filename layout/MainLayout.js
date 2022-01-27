import React from "react";
import Sidebar from "../components/Common/Sidebar";
import Footer from "../components/Common/Footer";
import Head from "next/head";
import Navbar from "../components/Common/Navbar";

export default function MainLayout({ children }) {
  return (
    <div>
      {" "}
      <Head>
        <title>FARM SOUVIRNIORS</title>
        {/* bootstrap */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        />
        {/* w3school */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://www.w3schools.com/w3css/4/w3.css"
        />
        {/* Google Web Fonts */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <div>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Prompt:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
        </div>
      </Head>
      <Navbar />
      <Sidebar />
      {children}
      <Footer />
    </div>
  );
}
