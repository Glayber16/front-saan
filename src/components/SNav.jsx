"use client";

import React, { useState, useEffect } from "react";
// Importando os ícones que faltavam no mobile (Minus, Plus)
import { Menu, X, Moon, Sun, Type, AArrowDown, AArrowUp, RotateCcw, LogOut, Minus, Plus } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/utils/auth"; // Assumindo que essa função existe conforme seu código

const NAV_LINKS = [
  { href: "#O_que", label: "O que é?" },
  { href: "#personas", label: "Personas" },
  { href: "#Likert", label: "Como Funciona" },
  { href: "#atores", label: "Atores" },
  { href: "#funcionalidades", label: "Funcionalidades" },
];

export function SNav() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  useEffect(() => {
    setIsLoggedIn(checkAuth ? checkAuth() : false);
  }, []);

  const handleLogout = async () => {
    try {
      if(api) await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      localStorage.removeItem('auth_state');
      setIsLoggedIn(false);
      router.push("/login");
      setIsMenuOpen(false);
    }
  };

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

     
          <div className="mr-2 flex items-center gap-1 rounded-lg bg-muted/50 p-1">
            <button onClick={decreaseFont} disabled={fontSize <= 85} className="p-1 hover:text-primary disabled:opacity-30">
              <AArrowDown size={16} />
            </button>
            <button onClick={resetFont} className="p-1 hover:text-primary disabled:opacity-30">
              <RotateCcw size={16} />
            </button>
            <button onClick={increaseFont} disabled={fontSize >= 125} className="p-1 hover:text-primary disabled:opacity-30">
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
          </button>

  
          <button
            onClick={toggleFont}
            className={`group flex flex-col items-center justify-center gap-0.5 rounded-lg p-2 transition-all ${
              fontDyslexic ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/50 hover:text-primary"
            }`}
            title="Fonte para Dislexia"
          >
            <Type size={20} />
          </button>

      
          {!isLoggedIn ? (
            <a href="/login" className="btn-primary ml-4 text-sm shadow-lg shadow-primary/20">
              Começar
            </a>
          ) : (
            <button onClick={handleLogout} className="ml-2 rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive" title="Sair">
              <LogOut size={20} />
            </button>
          )}
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
          <div className="flex flex-col space-y-4 p-4 max-h-[85vh] overflow-y-auto">
      
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="py-2 text-base font-medium text-foreground transition-colors hover:text-primary border-b border-border/50"
              >
                {link.label}
              </a>
            ))}

            <div className="bg-muted/30 rounded-lg p-3 space-y-3 mt-2">
                <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Acessibilidade</span>
       
                <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Tamanho Texto</span>
                    <div className="flex items-center gap-2 bg-background rounded-md border border-border p-1">
                        <button onClick={decreaseFont} disabled={fontSize <= 85} className="p-2 hover:bg-muted rounded"><Minus size={16}/></button>
                        <span className="text-xs font-mono w-8 text-center">{fontSize}%</span>
                        <button onClick={increaseFont} disabled={fontSize >= 125} className="p-2 hover:bg-muted rounded"><Plus size={16}/></button>
                    </div>
                </div>
     
                <button 
                  onClick={toggleFont}
                  className="flex w-full items-center justify-between rounded-md p-2 hover:bg-background transition-colors"
                >
                  <span className="text-sm text-foreground">Fonte Dislexia</span>
                  <div className={`p-1 rounded ${fontDyslexic ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                     <Type size={16} />
                  </div>
                </button>

        
                <button 
                  onClick={toggleTheme}
                  className="flex w-full items-center justify-between rounded-md p-2 hover:bg-background transition-colors"
                >
                  <span className="text-sm text-foreground">Tema Escuro</span>
                  <div className={`p-1 rounded ${theme === 'dark' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                     {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                  </div>
                </button>
            </div>

          
            <div className="pt-2">
                {!isLoggedIn ? (
                <a
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-primary flex w-full justify-center py-3"
                >
                    Começar Avaliação
                </a>
                ) : (
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-destructive/20 py-3 text-destructive hover:bg-destructive/10 font-medium"
                >
                    <LogOut size={18} /> Sair do Sistema
                </button>
                )}
            </div>

          </div>
        </div>
      )}
    </nav>
  );
}