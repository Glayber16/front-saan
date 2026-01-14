"use client";

import React from "react";
import Link from "next/link";
import { Settings2, ClipboardCheck, Briefcase, UserCheck } from "lucide-react";
import { SystemNav } from "@/components/SystemNav";
import { Footer } from "@/components/Footer";

export default function PortalPage() {
  return (
    <div className="page-container flex flex-col font-sans">
      <SystemNav description="Avaliação de Acessibilidade" />

      <main className="flex flex-1 flex-col items-center justify-center p-5">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-4xl font-extrabold text-foreground">Portal de Avaliações</h1>
          <p className="text-lg text-muted-foreground">Selecione seu perfil para continuar</p>
        </div>

        <div className="grid w-full max-w-[800px] grid-cols-1 gap-6 md:grid-cols-2">
          <Link
            href="/cadastroForms"
            className="card-calm group flex flex-col items-center p-10 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl"
          >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
              <Settings2 size={40} />
            </div>
            <h2 className="mb-2 text-2xl font-semibold text-foreground">Sou Admin</h2>
            <p className="leading-relaxed text-muted-foreground">
              Cadastrar formulários, gerenciar perguntas e definir escalas.
            </p>
          </Link>

          <Link
            href="/getForms"
            className="card-calm group flex flex-col items-center p-10 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl"
          >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
              <ClipboardCheck size={40} />
            </div>
            <h2 className="mb-2 text-2xl font-semibold text-foreground">Sou Avaliador</h2>
            <p className="leading-relaxed text-muted-foreground">
              Responder avaliações disponíveis e testar a plataforma.
            </p>
          </Link>

          <Link
            href="/aplicacoes"
            className="card-calm group flex flex-col items-center p-10 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl"
          >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
              <Briefcase size={40} />
            </div>
            <h2 className="mb-2 text-2xl font-semibold text-foreground">Sou Engenheiro</h2>
            <p className="leading-relaxed text-muted-foreground">
              Cadastrar aplicações e atribuir formulários a avaliadores.
            </p>
          </Link>

          <Link
            href="/cliente"
            className="card-calm group flex flex-col items-center p-10 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl"
          >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
              <UserCheck size={40} />
            </div>
            <h2 className="mb-2 text-2xl font-semibold text-foreground">Sou Cliente</h2>
            <p className="leading-relaxed text-muted-foreground">
              Consultar a nota (0 a 10) de acessibilidade por aplicação.
            </p>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
