"use client";

import React from "react";
import { 
  Save, Smartphone, Globe, Users, FileText 
} from "lucide-react";
import { SystemNav } from "@/components/SystemNav";
import { Footer } from "@/components/Footer";

export default function AplicacoesPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans flex flex-col">
      
      <SystemNav description="Portal do Engenheiro" mode="admin" />

      <main className="flex-1 max-w-4xl w-full mx-auto px-5 pb-20">
        
   
        <div className="mb-8 border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Cadastrar Nova Aplicação</h1>
          <p className="text-slate-400">Associe um formulário a avaliadores para iniciar o ciclo de testes.</p>
        </div>

        <section className="bg-slate-800 border border-slate-700 rounded-xl p-6 md:p-8 shadow-lg mb-12">
          <form className="space-y-6">
            
       
            <div>
              <label htmlFor="app-name" className="block text-slate-400 text-lg font-bold uppercase tracking-wider mb-2">
                Nome da Aplicação *
              </label>
              <input 
                id="app-name"
                type="text" 
                placeholder="Ex: E-commerce Web"
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors placeholder:text-slate-600"
              />
            </div>

          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="app-type" className="block text-slate-400 text-lg font-bold uppercase tracking-wider mb-2">
                  Tipo
                </label>
                <div className="relative">
                  <select 
                    id="app-type"
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                  >
                    <option value="web">Aplicação Web</option>
                    <option value="mobile">Aplicação Mobile</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                    <Smartphone size={16} />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="app-url" className="block text-slate-400 text-lg font-bold uppercase tracking-wider mb-2">
                  URL (Opcional)
                </label>
                <input 
                  id="app-url"
                  type="text" 
                  placeholder="https://..."
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors placeholder:text-slate-600"
                />
              </div>
            </div>

 
            <div>
              <label htmlFor="form-select" className="block text-slate-400 text-lg font-bold uppercase tracking-wider mb-2">
                Formulário de Avaliação *
              </label>
              <div className="relative">
                <select 
                  id="form-select"
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3  focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer text-slate-400"
                >
                  <option value="">Carregando formulários...</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                  <FileText size={16} />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="evaluators-select" className="block text-slate-400 text-lg font-bold uppercase tracking-wider mb-2">
                Avaliadores *
              </label>
              <select 
                id="evaluators-select"
                multiple
                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 h-40 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900"
              >
                
              </select>
              <p className="text-lg text-slate-500 mt-2 flex items-center gap-1">
                <Users size={12} /> 0 avaliadores selecionados.
              </p>
            </div>

 
            <div className="flex justify-end gap-4 pt-4 border-t border-slate-700/50">
              <button 
                type="button"
                className="px-6 py-3 bg-transparent border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20"
              >
                <Save size={20} /> Salvar Aplicação
              </button>
            </div>

          </form>
        </section>

  
        <section>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Globe className="text-blue-500" size={24}/> Aplicações Cadastradas
          </h2>
          
          <div className="grid gap-4">
            <div className="p-8 border border-dashed border-slate-700 rounded-lg text-center text-slate-500">
              Nenhuma aplicação cadastrada ainda.
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}