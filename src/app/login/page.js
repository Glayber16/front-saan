"use client";

import React, {useState} from "react";
import {api} from "@/services/api";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {LogIn, AlertCircle, Loader2} from "lucide-react";
import {Footer} from "@/components/Footer";
import {SystemNav} from "@/components/SystemNav";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({user: "", pass: ""});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/auth/login", {
        username: formData.user,
        password: formData.pass,
      });

      localStorage.setItem("auth_state", "true");

      router.push("/inicio");
    } catch (err) {
      setError(err.message || "Falha ao realizar login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container flex flex-col font-sans">
      <SystemNav description="Avaliação de Acessibilidade" />

      <main className="flex flex-1 items-center justify-center p-4">
        <div className="card-calm w-full max-w-md p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-2xl font-bold text-foreground">Bem-vindo</h1>
            <p className="text-sm text-muted-foreground">Faça login para acessar o sistema</p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Usuário
              </label>
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
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Senha
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="input-calm"
                value={formData.pass}
                onChange={(e) => setFormData({...formData, pass: e.target.value})}
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary mt-4 w-full disabled:opacity-50">
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <LogIn size={20} /> Entrar
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <Link href="/cadastro" className="font-semibold text-primary transition-all hover:underline">
              Criar conta
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
