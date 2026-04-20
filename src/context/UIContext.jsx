import { createContext, useEffect, useState } from "react";

export const UIContext = createContext();

export function UIProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <UIContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </UIContext.Provider>
  );
}