import React, { createContext, useEffect, useState } from "react";

export const IsMobileCtx = createContext();

function IsMobileContext({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const isMobileView = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    isMobileView();
    window.addEventListener("resize", isMobileView);

    return () => {
      window.removeEventListener("resize", isMobileView);
    };
  }, []);
  return (
    <IsMobileCtx.Provider value={isMobile}>{children}</IsMobileCtx.Provider>
  );
}

export default IsMobileContext;
