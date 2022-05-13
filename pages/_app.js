import "../styles/globals.css";
import MainLayout from "../layout/MainLayout";
import { UserProvider } from "../context/user";
import { MoralisProvider } from "react-moralis";
import Config from "../config";
function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId={Config.appIDGanache}
      serverUrl={Config.serverURLGanache}
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
