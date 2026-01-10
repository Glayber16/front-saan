"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UserPlus, AlertCircle, Loader2 } from "lucide-react"; 
import { Footer } from "@/components/Footer"; 
import { SystemNav } from "@/components/SystemNav";

export default function CadastroPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ 
    user: "", 
    pass: "", 
    role: "avaliador" 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Dados de cadastro:", formData);
      // await fetch...
    } catch (err) {
      setError("Erro ao criar conta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="page-container flex flex-col font-sans">
      
      <SystemNav description="Avaliação de Acessibilidade" />

      <main className="flex-1 flex items-center justify-center p-4">
      
        <div className="w-full max-w-md card-calm p-8 shadow-2xl">
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Criar Conta</h1>
            <p className="text-muted-foreground text-sm">Preencha os dados abaixo</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle size={16}/> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-muted-foreground text-xs font-bold uppercase tracking-wider mb-2">Usuário</label>
              <input 
                type="text" 
                required
                
                className="input-calm"
                value={formData.user}
                onChange={(e) => setFormData({...formData, user: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-muted-foreground text-xs font-bold uppercase tracking-wider mb-2">Senha</label>
              <input 
                type="password" 
                required
                className="input-calm"
                value={formData.pass}
                onChange={(e) => setFormData({...formData, pass: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-muted-foreground text-xs font-bold uppercase tracking-wider mb-2">Perfil</label>
              <div className="relative">
                <select 
                  className="input-calm appearance-none cursor-pointer"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="admin">Admin</option>
                  <option value="engenheiro">Engenheiro de Testes</option>
                  <option value="avaliador">Avaliador</option>
                  <option value="stakeholder">Cliente/Stakeholder</option>
                </select>
                
                
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-muted-foreground">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-primary mt-4 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <><UserPlus size={20} /> Cadastrar</>}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Já tem uma conta?{' '}
            <Link href="/login" className="text-primary font-semibold hover:underline transition-all">
              Fazer Login
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}