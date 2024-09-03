"use client"
// import useLocalStorageState from "@/hooks/useLocalStorageState";
import { useEffect, useMemo } from "react";
import { ThemeContext, ThemeVariant } from "./ThemeContext";
import useLocalStorageState from "../hooks/useLocalStorageState";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useLocalStorageState<string>(
    "theme:name",
    "default",
  );
  const [variant, setVariant] = useLocalStorageState<ThemeVariant>(
    "theme:variant",
    "dark",
  );

  useEffect(() => {
    document.documentElement.className = `theme-${theme} ${variant}`;
  }, [theme, variant]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      variant,
      setVariant,
      allThemes: [
        "dracula",
        "gold",
        "laracon",
        "nature",
        "netflix",
        "nord",
        null,
      ],
    }),
    [theme, variant],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
