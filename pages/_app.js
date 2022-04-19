import "../styles/globals.css";
import MainLayout from "../layout/MainLayout";
import { UserProvider } from "../context/user";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId="3YdqJ5iL4D9TM3DnoGeM9F7QZ5Qm8Z7m0dNP2Na6"
      serverUrl="https://p5myguticiga.usemoralis.com:2053/server"
    >
      <UserProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </UserProvider>
    </MoralisProvider>
  );
}

export default MyApp;
