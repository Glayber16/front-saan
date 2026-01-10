"use client";

import React from "react";
import { Search, BarChart3, HelpCircle, FileText } from "lucide-react";
import { SystemNav } from "@/components/SystemNav";
import { Footer } from "@/components/Footer";

export default function ClientePage() {
  return (
    
    <div className="page-container flex flex-col font-sans">
      
      <SystemNav description="Portal do Cliente" />

      <main className="flex-1 max-w-4xl w-full mx-auto px-5 pb-20">
        
      
        <div className="mb-8 border-b border-border pb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Nota de Acessibilidade</h1>
          <p className="text-muted-foreground">
            Selecione a aplicação para visualizar a nota agregada (0 a 10) com base nas avaliações concluídas.
          </p>
        </div>

       
        <section className="card-calm p-6 md:p-8 mb-12 shadow-lg">
          <form className="flex flex-col md:flex-row gap-4 items-end">
            
            <div className="flex-1 w-full">
              <label htmlFor="app-select" className="block text-muted-foreground text-xs font-bold uppercase tracking-wider mb-2">
                Aplicação
              </label>
              <div className="relative">
              
                <select 
                  id="app-select"
                  className="input-calm appearance-none cursor-pointer"
                >
                  <option value="">Selecione uma aplicação...</option>
                </select>
                
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-muted-foreground">
                  <BarChart3 size={16} />
                </div>
              </div>
            </div>

            
            <button 
              type="button" 
              className="btn-primary w-full md:w-auto shadow-lg shadow-primary/20"
            >
              <Search size={20} /> Ver Nota
            </button>
          </form>
        </section>

      
        <section className="card-calm p-8 text-center shadow-2xl relative overflow-hidden">
          
          <div className="text-muted-foreground font-medium mb-6 flex items-center justify-center gap-2">
            Índice de Acessibilidade
            <HelpCircle size={14} className="text-muted-foreground cursor-help" title="Baseado na escala Likert Linear"/>
          </div>

          <div className="mb-8">
            
            <span className="text-7xl md:text-8xl font-black text-muted-foreground/30 tracking-tighter">
              --
            </span>
            <span className="text-2xl text-muted-foreground font-medium ml-2">/ 10</span>
          </div>

          
          <div className="w-full max-w-md mx-auto h-4 bg-muted rounded-full overflow-hidden mb-8 border border-border">
            <div 
              className="h-full bg-primary transition-all duration-1000 ease-out" 
              style={{ width: '0%' }}
            ></div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-lg text-muted-foreground pt-6 border-t border-border">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-primary"/>
              <span>0 avaliações</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 size={16} className="text-primary"/>
              <span>0 respostas contabilizadas</span>
            </div>
            <div className="flex items-center gap-2">
              
              <span className="px-2 py-1 rounded text-xs border border-border bg-muted font-mono text-muted-foreground">
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