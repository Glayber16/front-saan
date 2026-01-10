"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Layers, Loader2, RefreshCw, FolderOpen, Plus } from "lucide-react";
import { SystemNav } from "@/components/SystemNav";
import { Footer } from "@/components/Footer";
import { QuestionCard } from "@/components/QuestionCard";

export default function VisualizarPage() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchForms = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/forms");
      if (!res.ok) throw new Error("Falha na conexão");
      const data = await res.json();
      setForms(data);
    } catch (err) {
      console.error("Erro ao buscar formulários:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <div className="page-container flex flex-col font-sans">
      <SystemNav description="Portal do Avaliador" mode="avaliador" />

      <main className="mx-auto mt-10 w-full max-w-[800px] flex-1 px-5">
        {loading && (
          <div className="flex animate-pulse flex-col items-center justify-center py-20 text-muted-foreground">
            <Loader2 size={40} className="mb-4 animate-spin text-primary" />
            <p>Carregando formulários...</p>
          </div>
        )}

        {!loading && forms.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 py-20 text-muted-foreground">
            <FolderOpen size={48} className="mb-4 text-muted-foreground/50" />
            <p className="mb-4">Nenhum formulário encontrado.</p>
            <Link href="cadastroForms" className="font-medium text-primary hover:underline">
              Criar um agora
            </Link>
          </div>
        )}

        {!loading && forms.length > 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 space-y-16 duration-500">
            {[...forms].reverse().map((form, index) => (
              <div key={form.id || index} className="border-b border-border pb-10 last:border-0">
                <div className="mb-8">
                  <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                    Formulário #{forms.length - index}
                  </span>
                  <h2 className="mb-2 text-3xl font-extrabold text-foreground">{form.title}</h2>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {form.description || "Sem descrição."}
                  </p>
                </div>

                {form.questions && form.questions.length > 0 ? (
                  <div>
                    {form.questions.map((q, qIndex) => (
                      <QuestionCard key={q.id || qIndex} question={q} index={qIndex} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-border bg-muted/20 p-8 text-center italic text-muted-foreground">
                    Este formulário ainda não possui perguntas cadastradas.
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
