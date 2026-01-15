"use client";

import {useTheme} from "@/contexts/ThemeContext";
import {Moon, Sun} from "lucide-react";

export function ThemeToggle() {
  const {theme, toggleTheme} = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 rounded-full bg-primary p-4 text-white shadow-lg transition-transform duration-200 hover:scale-110"
      title="Alternar Tema"
    >
      {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
}
