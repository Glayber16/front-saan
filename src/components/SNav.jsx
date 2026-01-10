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
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <div className="shrink-0">
          <a href="#" className="font-bold text-xl text-foreground">
            Avaliador
          </a>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground text-sm font-medium hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          
          <button
            onClick={toggleTheme}

            className="flex flex-col items-center justify-center gap-0.5 p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted/50 transition-all group"
            title="Alternar Tema"
          >
            <div className="group-hover:text-primary transition-colors">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wide leading-none">
              {theme === 'dark' ? 'Claro' : 'Escuro'}
            </span>
          </button>

          <a 
            href="#iniciar" 
            className="btn-primary text-sm shadow-lg shadow-primary/20 ml-4"
          >
            Começar Avaliação
          </a>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-border shadow-lg animate-in slide-in-from-top-5">
          <div className="flex flex-col p-4 space-y-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)} 
                className="text-foreground text-base font-medium py-2 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            
            <button 
              onClick={toggleTheme}
              className="flex items-center gap-3 text-foreground font-medium py-2 hover:text-primary"
            >
               {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
               <span>Alternar Tema ({theme === 'dark' ? 'Claro' : 'Escuro'})</span>
            </button>

            <a 
              href="#iniciar"
              onClick={() => setIsMenuOpen(false)} 
              className="w-full btn-primary justify-center"
            >
              Começar Avaliação
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}