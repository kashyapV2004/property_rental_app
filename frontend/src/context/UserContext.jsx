import { createContext,useContext,useState } from "react";

const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
});

export default function UserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(){
    return useContext(UserContext);
}

// export default UserContext;
