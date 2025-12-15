"use client";

import React from "react";
import { Search, BarChart3, HelpCircle, FileText } from "lucide-react";
import { SystemNav } from "@/components/SystemNav";
import { Footer } from "@/components/Footer";

export default function ClientePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans flex flex-col">
      
      <SystemNav description="Portal do Cliente" />

      <main className="flex-1 max-w-4xl w-full mx-auto px-5 pb-20">
        
    
        <div className="mb-8 border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Nota de Acessibilidade</h1>
          <p className="text-slate-400">
            Selecione a aplicação para visualizar a nota agregada (0 a 10) com base nas avaliações concluídas.
          </p>
        </div>

      
        <section className="bg-slate-800 border border-slate-700 rounded-xl p-6 md:p-8 shadow-lg mb-12">
          <form className="flex flex-col md:flex-row gap-4 items-end">
            
            <div className="flex-1 w-full">
              <label htmlFor="app-select" className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                Aplicação
              </label>
              <div className="relative">
                <select 
                  id="app-select"
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3  focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer text-slate-400"
                >
                  <option value="">Selecione uma aplicação...</option>
               
                </select>
               
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                  <BarChart3 size={16} />
                </div>
              </div>
            </div>

            <button 
              type="button" 
              className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20"
            >
              <Search size={20} /> Ver Nota
            </button>
          </form>
        </section>

   
        <section className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center shadow-2xl relative overflow-hidden">
          
        
          <div className="text-slate-400 font-medium mb-6 flex items-center justify-center gap-2">
            Índice de Acessibilidade
            <HelpCircle size={14} className="text-slate-500 cursor-help" title="Baseado na escala Likert Linear"/>
          </div>

     
          <div className="mb-8">
            <span className="text-7xl md:text-8xl font-black text-slate-700 tracking-tighter">
              --
            </span>
            <span className="text-2xl text-slate-600 font-medium ml-2">/ 10</span>
          </div>

    
          <div className="w-full max-w-md mx-auto h-4 bg-slate-900 rounded-full overflow-hidden mb-8 border border-slate-700/50">
            <div 
              className="h-full bg-blue-500 transition-all duration-1000 ease-out" 
              style={{ width: '0%' }}
            ></div>
          </div>

          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-lg text-slate-400 pt-6 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-blue-500"/>
              <span>0 avaliações</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 size={16} className="text-blue-500"/>
              <span>0 respostas contabilizadas</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-slate-900 px-2 py-1 rounded text-xs border border-slate-700 font-mono text-slate-500">
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