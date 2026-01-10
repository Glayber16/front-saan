"use client";

import React, { useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const NAV_LINKS = [
  { href: "#O_que", label: "O que é?" },
  { href: "#personas", label: "Personas" },
  { href: "#Likert", label: "Como Funciona" },
  { href: "#atores", label: "Atores" },
  { href: "#funcionalidades", label: "Funcionalidades" },
];

export function SNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="shrink-0">
          <a href="#" className="text-xl font-bold text-foreground">
            Avaliador
          </a>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}

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

          <a href="#iniciar" className="btn-primary ml-4 text-sm shadow-lg shadow-primary/20">
            Começar Avaliação
          </a>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg p-2 text-foreground transition-colors hover:bg-muted md:hidden"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="animate-in slide-in-from-top-5 absolute left-0 top-16 w-full border-b border-border bg-background shadow-lg md:hidden">
          <div className="flex flex-col space-y-4 p-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="py-2 text-base font-medium text-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 py-2 font-medium text-foreground hover:text-primary"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              <span>Alternar Tema ({theme === "dark" ? "Claro" : "Escuro"})</span>
            </button>

            <a
              href="#iniciar"
              onClick={() => setIsMenuOpen(false)}
              className="btn-primary w-full justify-center"
            >
              Começar Avaliação
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
