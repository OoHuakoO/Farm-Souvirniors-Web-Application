import "../styles/globals.css";
import MainLayout from "../layout/MainLayout";
import { MoralisProvider } from "react-moralis";
function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider appId="b5cFwbXEDsLEqcWRFCHCWrMl6oIeDecs4BirPL4H" serverUrl="https://dvtlqjh2dbih.usemoralis.com:2053/server">
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </MoralisProvider>
  );
}

export default MyApp;
