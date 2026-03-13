import { createContext, useContext, useState } from "react";

const LoaderContext = createContext();

export function LoaderContextProvider({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoaderContext.Provider>
  );
}

export default function useLoader(){
  return useContext(LoaderContext);
}
// export default LoaderContext;