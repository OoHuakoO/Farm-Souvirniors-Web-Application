import { createContext, useContext, useState, useEffect } from "react";
const UserStateContext = createContext();
export function UserProvider({ children }) {
  const [share_address_wallet, setShare_Address_wallet] = useState();
  let sharedState = { share_address_wallet, setShare_Address_wallet };

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
