"use client"; 

import React, { useState } from "react";
import { Menu, X } from "lucide-react"; 

const NAV_LINKS = [
  { href: "#O_que", label: "O que é?" },
  { href: "#personas", label: "Personas" },
  { href: "#Likert", label: "Como Funciona" },
  { href: "#atores", label: "Atores" },
  { href: "#funcionalidades", label: "Funcionalidades" },
];

export function SNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50  bg-zinc-950/80 backdrop-blur-md border-b border-[#e7edf3] ">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
    
        <div className="shrink-0">
          <a href="#" className="font-bold text-xl text-[#0d141b] dark:text-white">
            Avaliador
          </a>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#0d141b] dark:text-gray-200 text-sm font-medium hover:text-[#137fec] transition-colors"
            >
              {link.label}
            </a>
          ))}
          
 
          <a 
            href="#iniciar" 
            className="px-5 py-2.5 bg-[#137fec] hover:bg-[#1170d2] text-white text-sm font-bold rounded-lg transition-colors"
          >
            Começar Avaliação
          </a>
        </div>

 
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-[#0d141b] dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>


      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-zinc-950 border-b border-[#e7edf3] dark:border-zinc-800 shadow-lg animate-in slide-in-from-top-5">
          <div className="flex flex-col p-4 space-y-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)} 
                className="text-[#0d141b] dark:text-gray-200 text-base font-medium py-2 hover:text-[#137fec] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a 
              href="#iniciar"
              onClick={() => setIsMenuOpen(false)} 
              className="w-full text-center px-5 py-3 bg-[#137fec] text-white font-bold rounded-lg"
            >
              Começar Avaliação
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}