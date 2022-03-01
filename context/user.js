import { createContext, useContext, useState, useEffect } from "react";
const UserStateContext = createContext();
export function UserProvider({ children }) {
  const [address_wallet, setAddress_wallet] = useState();
  let sharedState = { address_wallet, setAddress_wallet };

  useEffect(() => {
    const Address_wallet = localStorage.getItem("address_wallet");
    setAddress_wallet(Address_wallet);
  }, []);

  return (
    <UserStateContext.Provider value={sharedState}>
      {children}
    </UserStateContext.Provider>
  );
}

export function useUserState() {
  const state = useContext(UserStateContext);

  if (state === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }

  return state;
}
