// src/Context/SidebarContext.js
import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => setCollapsed(prev => !prev);

  return (
    <SidebarContext.Provider value={{ collapsed, toggleCollapse }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
