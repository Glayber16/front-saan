"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers } from "lucide-react";
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


  const currentLinks = NAV_CONFIG[mode] || NAV_CONFIG.public;

  return (
    <nav 
      className="bg-[#1e293b] border-b border-[#334155] px-6 py-4 flex items-center justify-between mb-8 sticky top-0 z-50 shadow-md" 
      aria-label="Navegação do Sistema"
    >
     
      <div className="flex items-center gap-2 font-bold text-xl">
        <Layers className="text-blue-500" aria-hidden="true" /> 
        <span className="text-slate-100">{description}</span>
      </div>
      
      <div className="flex gap-6 font-medium text-lg">
        {currentLinks.map((link) => {
          const isActive = pathname === link.href;
          
          return (
            <Link 
              key={link.href}
              href={link.href}
              className={'text-[#94a3b8] hover:text-blue-500 focus:text-blue-500'}
              aria-current={isActive ? "page" : undefined}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}