"use client";

import React from "react";
import { Save, Smartphone, Globe, Users, FileText } from "lucide-react";
import { SystemNav } from "@/components/SystemNav";
import { Footer } from "@/components/Footer";

export default function AplicacoesPage() {
  return (
    <div className="page-container flex flex-col font-sans">
      <SystemNav description="Portal do Engenheiro" mode="admin" />

      <main className="mx-auto w-full max-w-4xl flex-1 px-5 pb-20">
        <div className="mb-8 border-b border-border pb-6">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Cadastrar Nova Aplicação</h1>
          <p className="text-muted-foreground">
            Associe um formulário a avaliadores para iniciar o ciclo de testes.
          </p>
        </div>

        <section className="card-calm mb-12 p-6 md:p-8">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="app-name"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Nome da Aplicação *
              </label>
              <input
                id="app-name"
                type="text"
                placeholder="Ex: E-commerce Web"
                className="input-calm"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="app-type"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Tipo
                </label>
                <div className="relative">
                  <select id="app-type" className="input-calm cursor-pointer appearance-none">
                    <option value="web">Aplicação Web</option>
                    <option value="mobile">Aplicação Mobile</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                    <Smartphone size={16} />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="app-url"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  URL (Opcional)
                </label>
                <input id="app-url" type="text" placeholder="https://..." className="input-calm" />
              </div>
            </div>

            <div>
              <label
                htmlFor="form-select"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Formulário de Avaliação *
              </label>
              <div className="relative">
                <select id="form-select" className="input-calm cursor-pointer appearance-none">
                  <option value="">Carregando formulários...</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                  <FileText size={16} />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="evaluators-select"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Avaliadores *
              </label>
              <select id="evaluators-select" multiple className="input-calm h-40 py-2"></select>
              <p className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                <Users size={14} /> 0 avaliadores selecionados.
              </p>
            </div>

            <div className="flex justify-end gap-4 border-t border-border pt-4">
              <button
                type="button"
                className="rounded-lg border border-border px-6 py-3 font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Cancelar
              </button>

              <button type="submit" className="btn-primary">
                <Save size={20} /> Salvar Aplicação
              </button>
            </div>
          </form>
        </section>

        <section>
          <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-foreground">
            <Globe className="text-primary" size={24} /> Aplicações Cadastradas
          </h2>

          <div className="grid gap-4">
            <div className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
              Nenhuma aplicação cadastrada ainda.
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
