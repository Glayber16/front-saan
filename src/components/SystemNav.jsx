"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers, Moon, Sun, Type, AArrowDown, AArrowUp, RotateCcw } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const NAV_CONFIG = {
  admin: [
    { label: "Home", href: "/" },
    { label: "Início", href: "/inicio" },
    { label: "Visualizar", href: "/getForms" },
    { label: "Cadastrar", href: "/cadastroForms" },
  ],
  avaliador: [
    { label: "Home", href: "/" },
    { label: "Início", href: "/inicio" },
    { label: "Visualizar", href: "/getForms" },
  ],
  public: [
    { label: "Home", href: "/" },
    { label: "Login", href: "/login" },
    { label: "Cadastro", href: "/cadastro" },
  ],
};

export function SystemNav({ description = "Avaliação", mode = "public" }) {
  const pathname = usePathname();
  const {
    theme,
    toggleTheme,
    fontDyslexic,
    toggleFont,
    fontSize,
    increaseFont,
    decreaseFont,
    resetFont,
  } = useTheme();
  const currentLinks = NAV_CONFIG[mode] || NAV_CONFIG.public;

  return (
    <nav className="sticky top-0 z-50 mb-8 flex items-center justify-between border-b border-border bg-card px-6 py-4 shadow-sm transition-colors duration-300">
      <div className="flex items-center gap-2 text-xl font-bold">
        <Layers className="text-primary" aria-hidden="true" />
        <span className="text-foreground transition-colors">{description}</span>
      </div>

      <div className="flex items-center gap-6 text-lg font-medium">
        {currentLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`outline-none transition-colors duration-200 ${
                isActive
                  ? "font-bold text-primary"
                  : "text-muted-foreground hover:text-primary focus:text-primary"
              } `}
              aria-current={isActive ? "page" : undefined}
            >
              {link.label}
            </Link>
          );
        })}

        <div className="mx-2 hidden h-8 w-px bg-border md:block"></div>

        <div className="mr-2 flex items-center gap-1 rounded-lg bg-muted/50 p-1">
          <button
            onClick={decreaseFont}
            disabled={fontSize <= 85}
            className="p-1 hover:text-primary disabled:opacity-30"
          >
            <AArrowDown size={16} />
          </button>
          <button onClick={resetFont} className="p-1 hover:text-primary disabled:opacity-30">
            {" "}
            <RotateCcw size={16} />{" "}
          </button>
          <button
            onClick={increaseFont}
            disabled={fontSize >= 125}
            className="p-1 hover:text-primary disabled:opacity-30"
          >
            <AArrowUp size={16} />
          </button>
        </div>

        <button
          onClick={toggleTheme}
          className="group flex flex-col items-center justify-center gap-0.5 rounded-lg p-2 text-muted-foreground transition-all hover:bg-muted/50 hover:text-primary"
          title="Alternar Tema"
        >
          <div className="transition-colors group-hover:text-primary">
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </div>
          <span className="text-[10px] font-bold uppercase leading-none tracking-wide">
            {theme === "dark" ? "Claro" : "Escuro"}
          </span>
        </button>

        <button
          onClick={toggleFont}
          className={`group flex flex-col items-center justify-center gap-0.5 rounded-lg p-2 transition-all ${
            fontDyslexic
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted/50 hover:text-primary"
          } `}
          title="Fonte para Dislexia"
        >
          <Type size={20} />
          <span className="text-[10px] font-bold uppercase leading-none tracking-wide">
            {fontDyslexic ? "On" : "Off"}
          </span>
        </button>
      </div>
    </nav>
  );
}
