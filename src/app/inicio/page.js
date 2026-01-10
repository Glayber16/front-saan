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

      <main className="flex-1 flex flex-col items-center justify-center p-5">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-foreground mb-3">Portal de Avaliações</h1>
          <p className="text-muted-foreground text-lg">Selecione seu perfil para continuar</p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[800px]">
        
        
          <Link 
            href="/cadastroForms" 
            className="group card-calm p-10 flex flex-col items-center text-center hover:border-primary hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Settings2 size={40} />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Sou Admin</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cadastrar formulários, gerenciar perguntas e definir escalas.
            </p>
          </Link>

          
          <Link 
            href="/visualizar"
            className="group card-calm p-10 flex flex-col items-center text-center hover:border-primary hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ClipboardCheck size={40} />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Sou Avaliador</h2>
            <p className="text-muted-foreground leading-relaxed">
              Responder avaliações disponíveis e testar a plataforma.
            </p>
          </Link>

          
          <Link 
            href="/aplicacoes" 
            className="group card-calm p-10 flex flex-col items-center text-center hover:border-primary hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Briefcase size={40} /> 
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Sou Engenheiro</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cadastrar aplicações e atribuir formulários a avaliadores.
            </p>
          </Link>

          
          <Link 
            href="/cliente" 
            className="group card-calm p-10 flex flex-col items-center text-center hover:border-primary hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <UserCheck size={40} /> 
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Sou Cliente</h2>
            <p className="text-muted-foreground leading-relaxed">
              Consultar a nota (0 a 10) de acessibilidade por aplicação.
            </p>
          </Link>

        </div>
      </main>

      <Footer />

    </div>
  );
}