"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Layers, UserPlus, AlertCircle, Loader2 } from "lucide-react";
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
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans flex flex-col">
      
      <SystemNav description="Avaliação de Acessibilidade"></SystemNav>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-8">
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Criar Conta</h1>
            <p className="text-slate-400 text-sm">Preencha os dados abaixo</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle size={16}/> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Usuário</label>
              <input 
                type="text" 
                required
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-600"
                value={formData.user}
                onChange={(e) => setFormData({...formData, user: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Senha</label>
              <input 
                type="password" 
                required
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-600"
                value={formData.pass}
                onChange={(e) => setFormData({...formData, pass: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Perfil</label>
              <div className="relative">
                <select 
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="admin">Admin</option>
                  <option value="engenheiro">Engenheiro de Testes</option>
                  <option value="avaliador">Avaliador</option>
                  <option value="stakeholder">Cliente/Stakeholder</option>
                </select>
                
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 mt-4 shadow-lg shadow-blue-900/20"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <><UserPlus size={20} /> Cadastrar</>}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-400">
            Já tem uma conta?{' '}
            <Link href="/login" className="text-blue-400 font-semibold hover:text-blue-300 hover:underline">
              Fazer Login
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}