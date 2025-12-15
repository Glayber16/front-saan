"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Layers, LogIn, AlertCircle, Loader2 } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SystemNav } from "@/components/SystemNav";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ user: "", pass: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Dados para envio:", formData);
    } catch (err) {
      setError("Falha ao realizar login.");
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
            <h1 className="text-2xl font-bold text-white mb-2">Bem-vindo</h1>
            <p className="text-slate-400 text-sm">Faça login para acessar o sistema</p>
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
                placeholder="ex: joao"
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
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-600"
                value={formData.pass}
                onChange={(e) => setFormData({...formData, pass: e.target.value})}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 mt-4 shadow-lg shadow-blue-900/20"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <><LogIn size={20} /> Entrar</>}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-400">
            Não tem uma conta?{' '}
            <Link href="/cadastro" className="text-blue-400 font-semibold hover:text-blue-300 hover:underline">
              Criar conta
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}