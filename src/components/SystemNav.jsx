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
    { label: "Login", href: "/login" },
    { label: "Cadastro", href: "/cadastro" },
  ],
};

export function SystemNav({ description = "Avaliação", mode = "public" }) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
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
      </div>
    </nav>
  );
}
