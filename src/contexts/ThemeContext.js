"use client";

import React, {createContext, useContext, useEffect, useState} from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({children}) {
  const [theme, setTheme] = useState("light");
  const [fontDyslexic, setFontDyslexic] = useState(false);
  const [fontSize, setFontSize] = useState(100);

  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    const root = document.documentElement;
    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const toggleFont = () => {
    const newValue = !fontDyslexic;
    setFontDyslexic(newValue);

    const root = document.documentElement;
    if (newValue) {
      root.classList.add("dyslexic");
    } else {
      root.classList.remove("dyslexic");
    }
  };

  const increaseFont = () => setFontSize((prev) => Math.min(prev + 5, 125));
  const decreaseFont = () => setFontSize((prev) => Math.max(prev - 5, 85));
  const resetFont = () => setFontSize(100);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        fontDyslexic,
        toggleFont,
        fontSize,
        increaseFont,
        decreaseFont,
        resetFont,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
