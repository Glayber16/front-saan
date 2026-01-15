"use client";

import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {
  Layers,
  Moon,
  Sun,
  Type,
  AArrowDown,
  AArrowUp,
  RotateCcw,
  LogOut,
  ArrowLeft,
  Menu,
  X,
  Minus,
  Plus,
} from "lucide-react";
import {useTheme} from "@/contexts/ThemeContext";
import {api} from "@/services/api";
import {useEffect, useState} from "react";
import {checkAuth} from "@/utils/auth";

const NAV_CONFIG = {
  admin: [
    {label: "Home", href: "/inicio"},
    {label: "Visualizar", href: "/visualizar"},
    {label: "Cadastrar", href: "/cadastroForms"},
    {label: "Engenharia", href: "/aplicacoes"},
  ],
  avaliador: [
    {label: "Home", href: "/inicio"},
    {label: "Visualizar", href: "/visualizar"},
  ],
  public: [
    {label: "Home", href: "/"},
    {label: "Login", href: "/login"},
    {label: "Cadastro", href: "/cadastro"},
  ],
  publicLoggedIn: [{label: "Home", href: "/"}],
};

export function SystemNav({description = "Avaliação", mode = "public"}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {theme, toggleTheme, fontDyslexic, toggleFont, fontSize, increaseFont, decreaseFont, resetFont} = useTheme();

  useEffect(() => {
    setIsLoggedIn(checkAuth());
  }, []);

  let currentLinks = NAV_CONFIG[mode] || NAV_CONFIG.public;

  if (mode === "public" && isLoggedIn) {
    currentLinks = NAV_CONFIG.publicLoggedIn;
  }

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      localStorage.removeItem("auth_state");
      setIsLoggedIn(false);
      router.push("/login");
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 mb-8 w-full border-b border-border bg-card shadow-sm transition-colors duration-300">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          {isLoggedIn && (
            <button
              onClick={() => router.back()}
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              title="Voltar"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <Link
            href={mode === "public" ? "/" : "/inicio"}
            className="flex items-center gap-2 text-xl font-bold no-underline"
          >
            <Layers className="text-primary" aria-hidden="true" />
            <span className="text-foreground transition-colors">{description}</span>
          </Link>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <div className="flex items-center gap-6 text-lg font-medium">
            {currentLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`outline-none transition-colors duration-200 ${
                    isActive ? "font-bold text-primary" : "text-muted-foreground hover:text-primary focus:text-primary"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="h-8 w-px bg-border"></div>

          <div className="flex items-center gap-1 rounded-lg bg-muted/50 p-1">
            <button
              onClick={decreaseFont}
              disabled={fontSize <= 85}
              className="p-1 hover:text-primary disabled:opacity-30"
            >
              <AArrowDown size={16} />
            </button>
            <button onClick={resetFont} className="p-1 hover:text-primary disabled:opacity-30">
              <RotateCcw size={16} />
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

          {(mode !== "public" || isLoggedIn) && (
            <button
              onClick={handleLogout}
              className="ml-2 flex items-center gap-2 rounded-lg border border-transparent p-2 text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive active:scale-95"
              title="Sair do Sistema"
            >
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
        <div className="animate-in slide-in-from-top-5 absolute left-0 top-16 w-full border-b border-border bg-card shadow-lg md:hidden">
          <div className="flex max-h-[85vh] flex-col overflow-y-auto p-4">
            <div className="flex flex-col space-y-2 border-b border-border/50 pb-4">
              {currentLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`rounded-md px-3 py-2 text-base font-medium transition-colors ${
                      isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 space-y-3 rounded-lg bg-muted/30 p-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Acessibilidade</span>

              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Tamanho Texto</span>
                <div className="flex items-center gap-2 rounded-md border border-border bg-card p-1">
                  <button
                    onClick={decreaseFont}
                    disabled={fontSize <= 85}
                    className="rounded p-2 hover:bg-muted disabled:opacity-30"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-mono text-xs font-bold">{fontSize}%</span>
                  <button
                    onClick={increaseFont}
                    disabled={fontSize >= 125}
                    className="rounded p-2 hover:bg-muted disabled:opacity-30"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <button
                onClick={toggleFont}
                className="flex w-full items-center justify-between rounded-md p-2 transition-colors hover:bg-card"
              >
                <span className="text-sm text-foreground">Fonte Dislexia</span>
                <div
                  className={`rounded p-1 ${
                    fontDyslexic ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Type size={16} />
                </div>
              </button>

              <button
                onClick={toggleTheme}
                className="flex w-full items-center justify-between rounded-md p-2 transition-colors hover:bg-card"
              >
                <span className="text-sm text-foreground">Tema Escuro</span>
                <div
                  className={`rounded p-1 ${
                    theme === "dark" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </div>
              </button>
            </div>

            {(mode !== "public" || isLoggedIn) && (
              <div className="mt-4 border-t border-border/50 pt-2">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-destructive/20 py-3 font-medium text-destructive hover:bg-destructive/10"
                >
                  <LogOut size={18} /> Sair do Sistema
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
