"use client";

import React from "react";
import { 
  Save, Smartphone, Globe, Users, FileText 
} from "lucide-react";
import { SystemNav } from "@/components/SystemNav";
import { Footer } from "@/components/Footer";

export default function AplicacoesPage() {
  return (
    
    <div className="page-container font-sans flex flex-col">
      
      <SystemNav description="Portal do Engenheiro" mode="admin" />

      <main className="flex-1 max-w-4xl w-full mx-auto px-5 pb-20">
        
        
        <div className="mb-8 border-b border-border pb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Cadastrar Nova Aplicação</h1>
          <p className="text-muted-foreground">Associe um formulário a avaliadores para iniciar o ciclo de testes.</p>
        </div>

        
        <section className="card-calm p-6 md:p-8 mb-12">
          <form className="space-y-6">
            
            
            <div>
              <label htmlFor="app-name" className="block text-muted-foreground text-xs font-bold uppercase tracking-wider mb-2">
                Nome da Aplicação *
              </label>
              <input 
                id="app-name"
                type="text" 
                placeholder="Ex: E-commerce Web"
               
                className="input-calm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <label htmlFor="app-type" className="block text-muted-foreground text-xs font-bold uppercase tracking-wider mb-2">
                  Tipo
                </label>
                <div className="relative">
                  <select 
                    id="app-type"
                    className="input-calm appearance-none cursor-pointer"
                  >
                    <option value="web">Aplicação Web</option>
                    <option value="mobile">Aplicação Mobile</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-muted-foreground">
                    <Smartphone size={16} />
                  </div>
                </div>
              </div>

              
              <div>
                <label htmlFor="app-url" className="block text-muted-foreground text-xs font-bold uppercase tracking-wider mb-2">
                  URL (Opcional)
                </label>
                <input 
                  id="app-url"
                  type="text" 
                  placeholder="https://..."
                  className="input-calm"
                />
              </div>
            </div>

            
            <div>
              <label htmlFor="form-select" className="block text-muted-foreground text-xs font-bold uppercase tracking-wider mb-2">
                Formulário de Avaliação *
              </label>
              <div className="relative">
                <select 
                  id="form-select"
                  className="input-calm appearance-none cursor-pointer"
                >
                  <option value="">Carregando formulários...</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-muted-foreground">
                  <FileText size={16} />
                </div>
              </div>
            </div>

            
            <div>
              <label htmlFor="evaluators-select" className="block text-muted-foreground text-xs font-bold uppercase tracking-wider mb-2">
                Avaliadores *
              </label>
              <select 
                id="evaluators-select"
                multiple
                
                className="input-calm h-40 py-2"
              >
                
              </select>
              <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                <Users size={14} /> 0 avaliadores selecionados.
              </p>
            </div>

           
            <div className="flex justify-end gap-4 pt-4 border-t border-border">
              <button 
                type="button"
                className="px-6 py-3 rounded-lg border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors font-medium"
              >
                Cancelar
              </button>
              
              
              <button 
                type="submit" 
                className="btn-primary"
              >
                <Save size={20} /> Salvar Aplicação
              </button>
            </div>

          </form>
        </section>

       
        <section>
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Globe className="text-primary" size={24}/> Aplicações Cadastradas
          </h2>
          
          <div className="grid gap-4">
            <div className="p-8 border border-dashed border-border rounded-lg text-center text-muted-foreground">
              Nenhuma aplicação cadastrada ainda.
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}