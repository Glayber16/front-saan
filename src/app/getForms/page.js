"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Layers, Loader2, RefreshCw, 
  FolderOpen, Plus 
} from "lucide-react";
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
    
    <div className="page-container font-sans flex flex-col">
      
      <SystemNav description="Portal do Avaliador" mode="avaliador" />

      <main className="flex-1 max-w-[800px] w-full mx-auto px-5 mt-10">
        
    
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground animate-pulse">
            <Loader2 size={40} className="animate-spin mb-4 text-primary" />
            <p>Carregando formulários...</p>
          </div>
        )}

     
        {!loading && forms.length === 0 && (
           <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border border-dashed border-border rounded-xl bg-muted/30">
             <FolderOpen size={48} className="mb-4 text-muted-foreground/50" />
             <p className="mb-4">Nenhum formulário encontrado.</p>
             <Link href="cadastroForms" className="text-primary hover:underline font-medium">
               Criar um agora
             </Link>
           </div>
        )}

        
        {!loading && forms.length > 0 && (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {[...forms].reverse().map((form, index) => (
              <div key={form.id || index} className="border-b border-border pb-10 last:border-0">
                
             
                <div className="mb-8">
                  <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                    Formulário #{forms.length - index}
                  </span>
                  <h2 className="text-3xl font-extrabold text-foreground mb-2">{form.title}</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
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
                  <div className="p-8 border border-dashed border-border rounded-lg text-center text-muted-foreground italic bg-muted/20">
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