"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Layers, Loader2, RefreshCw, 
  FolderOpen, Plus 
} from "lucide-react";
import { SystemNav } from "@/components/SystemNav";

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
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans pb-20">
      
   
     <SystemNav description="Portal do Avaliador"/>

      <main className="max-w-[800px] mx-auto px-5 mt-10">
        
    
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 animate-pulse">
            <Loader2 size={40} className="animate-spin mb-4 text-blue-500" />
            <p>Carregando formulários...</p>
          </div>
        )}

       
        {!loading && forms.length === 0 && (
           <div className="flex flex-col items-center justify-center py-20 text-slate-400 border border-dashed border-slate-700 rounded-xl bg-slate-800/50">
             <FolderOpen size={48} className="mb-4 text-slate-500" />
             <p className="mb-4">Nenhum formulário encontrado.</p>
             <Link href="/admin/criar-formulario" className="text-blue-400 hover:underline">Criar um agora</Link>
           </div>
        )}

   
        {!loading && forms.length > 0 && (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {[...forms].reverse().map((form, index) => (
              <div key={form.id || index} className="border-b border-slate-700 pb-10 last:border-0">
                
                <div className="mb-8">
                  <span className="inline-block bg-blue-500/10 text-blue-400 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                    Formulário #{forms.length - index}
                  </span>
                  <h2 className="text-3xl font-extrabold text-white mb-2">{form.title}</h2>
                  <p className="text-slate-400 text-lg leading-relaxed">
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
                  <div className="p-8 border border-dashed border-slate-700 rounded-lg text-center text-slate-500 italic">
                    Este formulário ainda não possui perguntas cadastradas.
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}