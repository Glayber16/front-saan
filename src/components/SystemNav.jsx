"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers, Moon, Sun } from "lucide-react";
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
    { label: "Login", href: "/login"},
    { label: "Cadastro", href: "/cadastro"}
  ]
};

export function SystemNav({ description = "Avaliação", mode = "public" }) {
  const pathname = usePathname(); 
  const { theme, toggleTheme } = useTheme();
  const currentLinks = NAV_CONFIG[mode] || NAV_CONFIG.public;

  return (
    <nav className="bg-card border-b border-border px-6 py-4 flex items-center justify-between mb-8 sticky top-0 z-50 shadow-sm transition-colors duration-300">
      
      <div className="flex items-center gap-2 font-bold text-xl">
        <Layers className="text-primary" aria-hidden="true" /> 
        <span className="text-foreground transition-colors">{description}</span>
      </div>
      
      <div className="flex items-center gap-6 font-medium text-lg">
        {currentLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href}
              href={link.href}
              className={`transition-colors duration-200 outline-none
                ${isActive 
                  ? "text-primary font-bold" 
                  : "text-muted-foreground hover:text-primary focus:text-primary"
                }
              `}
              aria-current={isActive ? "page" : undefined}
            >
              {link.label}
            </Link>
          );
        })}

       <div className="h-8 w-px bg-border mx-2 hidden md:block"></div>

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
      </div>
    </nav>
  );
}