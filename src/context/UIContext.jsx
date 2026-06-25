/* eslint-disable react-refresh/only-export-components */

import { createContext, useCallback, useEffect, useState } from "react";

export const UIContext = createContext();

export function UIProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.body.classList.toggle("sidebar-lock", isSidebarOpen);

    return () => {
      document.body.classList.remove("sidebar-lock");
    };
  }, [isSidebarOpen]);

  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const openSidebar = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  return (
    <UIContext.Provider
      value={{
        theme,
        setTheme,
        isSidebarOpen,
        toggleTheme,
        openSidebar,
        closeSidebar,
        toggleSidebar,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}