"use client";

import React from "react";
import { Search, BarChart3, HelpCircle, FileText } from "lucide-react";
import { SystemNav } from "@/components/SystemNav";
import { Footer } from "@/components/Footer";

export default function ClientePage() {
  return (
    <div className="page-container flex flex-col font-sans">
      <SystemNav description="Portal do Cliente" />

      <main className="mx-auto w-full max-w-4xl flex-1 px-5 pb-20">
        <div className="mb-8 border-b border-border pb-6">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Nota de Acessibilidade</h1>
          <p className="text-muted-foreground">
            Selecione a aplicação para visualizar a nota agregada (0 a 10) com base nas avaliações
            concluídas.
          </p>
        </div>

        <section className="card-calm mb-12 p-6 shadow-lg md:p-8">
          <form className="flex flex-col items-end gap-4 md:flex-row">
            <div className="w-full flex-1">
              <label
                htmlFor="app-select"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Aplicação
              </label>
              <div className="relative">
                <select id="app-select" className="input-calm cursor-pointer appearance-none">
                  <option value="">Selecione uma aplicação...</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                  <BarChart3 size={16} />
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn-primary w-full shadow-lg shadow-primary/20 md:w-auto"
            >
              <Search size={20} /> Ver Nota
            </button>
          </form>
        </section>

        <section className="card-calm relative overflow-hidden p-8 text-center shadow-2xl">
          <div className="mb-6 flex items-center justify-center gap-2 font-medium text-muted-foreground">
            Índice de Acessibilidade
            <HelpCircle
              size={14}
              className="cursor-help text-muted-foreground"
              title="Baseado na escala Likert Linear"
            />
          </div>

          <div className="mb-8">
            <span className="text-7xl font-black tracking-tighter text-muted-foreground/30 md:text-8xl">
              --
            </span>
            <span className="ml-2 text-2xl font-medium text-muted-foreground">/ 10</span>
          </div>

          <div className="mx-auto mb-8 h-4 w-full max-w-md overflow-hidden rounded-full border border-border bg-muted">
            <div
              className="h-full bg-primary transition-all duration-1000 ease-out"
              style={{ width: "0%" }}
            ></div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 border-t border-border pt-6 text-lg text-muted-foreground md:gap-8">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-primary" />
              <span>0 avaliações</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 size={16} className="text-primary" />
              <span>0 respostas contabilizadas</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded border border-border bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">
                MÉTODO: LIKERT-LINEAR
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
