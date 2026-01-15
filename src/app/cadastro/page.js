"use client";

import React, {useState} from "react";
import {api} from "@/services/api";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {UserPlus, AlertCircle, Loader2} from "lucide-react";
import {Footer} from "@/components/Footer";
import {SystemNav} from "@/components/SystemNav";

export default function CadastroPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    user: "",
    pass: "",
    role: "avaliador",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/auth/register", {
        username: formData.user,
        password: formData.pass,
        role: formData.role,
      });
      router.push("/login");
    } catch (err) {
      setError(err.message || "Erro ao criar conta.");
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
            <h1 className="mb-2 text-2xl font-bold text-foreground">Criar Conta</h1>
            <p className="text-sm text-muted-foreground">Preencha os dados abaixo</p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
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
                className="input-calm"
                value={formData.pass}
                onChange={(e) => setFormData({...formData, pass: e.target.value})}
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Perfil
              </label>
              <div className="relative">
                <select
                  className="input-calm cursor-pointer appearance-none"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="admin">Admin</option>
                  <option value="engenheiro">Engenheiro de Testes</option>
                  <option value="avaliador">Avaliador</option>
                  <option value="stakeholder">Cliente/Stakeholder</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary mt-4 w-full disabled:opacity-50">
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <UserPlus size={20} /> Cadastrar
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link href="/login" className="font-semibold text-primary transition-all hover:underline">
              Fazer Login
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
