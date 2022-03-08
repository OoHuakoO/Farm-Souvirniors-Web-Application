import "../styles/globals.css";
import MainLayout from "../layout/MainLayout";
import { UserProvider } from "../context/user";
import { MoralisProvider } from "react-moralis";
function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId="kPg7clzA2Be7arc960GrpLVJEaXZh0X4u9h3VNjq"
      serverUrl="https://hqgfasdwij2x.usemoralis.com:2053/server"
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
