"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, AlertCircle, Loader2 } from "lucide-react";
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
   
    <div className="page-container flex flex-col font-sans">
      
      <SystemNav description="Avaliação de Acessibilidade" />
      
      <main className="flex-1 flex items-center justify-center p-4">
       
        <div className="w-full max-w-md card-calm p-8 shadow-2xl">
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Bem-vindo</h1>
            <p className="text-muted-foreground text-sm">Faça login para acessar o sistema</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-destructive/10 text-destructive border border-destructive/20 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle size={16}/> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-muted-foreground text-xs font-bold uppercase tracking-wider mb-2">Usuário</label>
              <input 
                type="text" 
                required
                placeholder="ex: joao"
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
                placeholder="••••••••"
                className="input-calm"
                value={formData.pass}
                onChange={(e) => setFormData({...formData, pass: e.target.value})}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-primary mt-4 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <><LogIn size={20} /> Entrar</>}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Não tem uma conta?{' '}
            <Link href="/cadastro" className="text-primary font-semibold hover:underline transition-all">
              Criar conta
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}