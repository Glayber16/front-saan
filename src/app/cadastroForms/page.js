"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Layers, Home, CheckCircle, AlertCircle, Upload, 
  Plus, Save, Trash2, HelpCircle, PlusCircle 
} from 'lucide-react';
import { SystemNav } from '@/components/SystemNav';

export default function CriarFormularioPage() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [questions, setQuestions] = useState([
    { id: 1, text: '', example: '', scaleType: '5-point' }
  ]);
  
  const [feedback, setFeedback] = useState({ type: '', msg: '' });
  
  // Refs para acessibilidade (Foco)
  const fileInputRef = useRef(null);
  const feedbackRef = useRef(null);

  // Efeito para mover o foco para o alerta quando ele aparecer
  useEffect(() => {
    if (feedback.type && feedbackRef.current) {
      feedbackRef.current.focus();
    }
  }, [feedback]);

  const addQuestion = () => {
    const maxId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) : 0;
    setQuestions([...questions, { id: maxId + 1, text: '', example: '', scaleType: '5-point' }]);
  };

  const removeQuestion = (id) => {
    if (questions.length <= 1) return;
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const lines = e.target.result.split(/\r?\n/).filter(line => line.trim() !== '');
      if (lines.length === 0) {
        setFeedback({ type: 'error', msg: 'O arquivo está vazio.' });
        return;
      }
      let currentQuestions = [...questions];
      if (currentQuestions.length === 1 && currentQuestions[0].text.trim() === '') {
        currentQuestions = [];
      }
      const maxId = currentQuestions.length > 0 ? Math.max(...currentQuestions.map(q => q.id)) : 0;
      const newQs = lines.map((line, idx) => {
        let qText = line;
        let qExample = '';
        const regex = /exemplo:/i;
        if (regex.test(line)) {
          const parts = line.split(regex);
          qText = parts[0].trim();
          qExample = parts.slice(1).join('exemplo:').trim();
        } else {
          qText = line.trim();
        }
        return { id: maxId + idx + 1, text: qText, example: qExample, scaleType: '5-point' };
      });
      setQuestions([...currentQuestions, ...newQs]);
      setFeedback({ type: 'info', msg: 'Perguntas importadas!' });
      setTimeout(() => setFeedback({ type: '', msg: '' }), 4000);
    };
    reader.onerror = () => setFeedback({ type: 'error', msg: 'Erro ao ler o arquivo.' });
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const resetForm = () => {
    setTitulo('');
    setDescricao('');
    setQuestions([{ id: 1, text: '', example: '', scaleType: '5-point' }]);
    setFeedback({ type: '', msg: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = async () => {
    if (!titulo.trim()) {
      setFeedback({ type: 'error', msg: 'Preencha o título do formulário.' });
      return;
    }
    const payload = { title: titulo, description: descricao, questions };
    
    // Simulação de save (mude para seu fetch real)
    try {
        const res = await fetch('http://localhost:3000/api/forms', {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
        });
        if (res.ok) {
            setFeedback({ type: 'success', msg: 'Salvo com sucesso!' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            setFeedback({ type: 'error', msg: 'Erro ao salvar no servidor.' });
        }
    } catch (e) {
        setFeedback({ type: 'error', msg: 'Erro de conexão.' });
    }
  };
  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f8fafc] font-sans pb-10">
      <SystemNav description="Avaliação de Acessibilidade"/>
        

      <div className="max-w-[800px] mx-auto px-5">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Criar Novo Formulário</h1>
          <p className="text-[#94a3b8]">Configure as perguntas que serão apresentadas na interface escura.</p>
        </div>

        <main>
          {/* ÁREA DE FEEDBACK ACESSÍVEL */}
          {feedback.type && (
            <div 
              ref={feedbackRef}
              tabIndex={-1} // Permite focar via JS
              role={feedback.type === 'error' ? 'alert' : 'status'} 
              aria-live="assertive"
              className={`p-4 rounded-lg mb-6 border-l-4 flex flex-col items-start animate-in fade-in outline-none ring-2 ring-offset-2 ring-offset-[#0f172a] ring-blue-500
                ${feedback.type === 'success' ? 'bg-green-500/10 border-green-500 text-green-400' : ''}
                ${feedback.type === 'error' ? 'bg-red-500/10 border-red-500 text-red-400' : ''}
                ${feedback.type === 'info' ? 'bg-blue-500/10 border-blue-500 text-blue-400' : ''}
              `}
            >
              <div className="flex items-center gap-3 font-bold text-lg">
                {feedback.type === 'success' && <CheckCircle aria-hidden="true" />}
                {feedback.type === 'error' && <AlertCircle aria-hidden="true" />}
                {feedback.type === 'info' && <CheckCircle aria-hidden="true" />}
                {feedback.msg}
              </div>
              
              {feedback.type === 'success' && (
                <div className="ml-9 mt-4 flex gap-3">
                  <Link href="/" className="flex items-center gap-2 px-4 py-2 bg-[#1e293b] border border-[#334155] rounded-md hover:text-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors">
                    <Home size={16} aria-hidden="true" /> Ir para o Início
                  </Link>
                  <button onClick={resetForm} className="flex items-center gap-2 px-4 py-2 bg-[#1e293b] border border-[#334155] rounded-md hover:text-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors">
                    <PlusCircle size={16} aria-hidden="true" /> Criar Novo
                  </button>
                </div>
              )}
            </div>
          )}

          <section className="flex flex-col gap-5 mb-8" aria-label="Dados básicos do formulário">
            <div>
              <label htmlFor="titulo-form" className="block text-[#94a3b8] font-medium mb-2 text-lg">Título do Formulário *</label>
              <input 
                id="titulo-form"
                type="text" 
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Avaliação de Contraste" 
                className="w-full p-3.5 bg-[#1e293b] border border-[#334155] rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="desc-form" className="block text-[#94a3b8] font-medium mb-2 text-lg">Descrição</label>
              <textarea 
                id="desc-form"
                rows={2} 
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Objetivo da avaliação..." 
                className="w-full p-3.5 bg-[#1e293b] border border-[#334155] rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>
          </section>

          <section className="border-2 border-dashed border-[#334155] rounded-xl p-8 text-center mb-8 bg-[#1e293b]/50">
            <h3 className="mb-2 text-base font-medium">Importar Perguntas (TXT)</h3>
            <p className="text-[#94a3b8] text-lg mb-4">Cada linha do arquivo será uma nova pergunta.</p>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".txt,.md,.csv" className="hidden" aria-hidden="true" />
            <button 
              onClick={() => fileInputRef.current.click()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1e293b] border border-[#334155] rounded-md hover:text-blue-500 hover:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <Upload size={16} aria-hidden="true" /> Selecionar Arquivo
            </button>
          </section>

          <div className="space-y-6 mb-8" role="list" aria-label="Lista de perguntas">
            {questions.map((q, index) => (
              <div key={q.id} className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 relative" role="listitem">
                <div className="absolute top-6 right-6 text-[#94a3b8] font-bold opacity-50" aria-hidden="true">
                  #{index + 1}
                </div>

                <div className="mb-4">
                  <label htmlFor={`pergunta-${q.id}`} className="block text-[#94a3b8] font-medium mb-2 text-lg">
                    Pergunta {index + 1}
                  </label>
                  <input 
                    id={`pergunta-${q.id}`}
                    type="text" 
                    value={q.text}
                    onChange={(e) => updateQuestion(q.id, 'text', e.target.value)}
                    placeholder="Digite a pergunta aqui..." 
                    className="w-full p-3.5 bg-[#1e293b] border border-[#334155] rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mt-4">
                  <label htmlFor={`exemplo-${q.id}`} className="text-blue-400 text-lg font-semibold mb-2 flex items-center gap-1.5">
                    <HelpCircle size={14} aria-hidden="true" /> Exemplo de Apoio (Contexto)
                  </label>
                  <input 
                    id={`exemplo-${q.id}`}
                    type="text" 
                    value={q.example}
                    onChange={(e) => updateQuestion(q.id, 'example', e.target.value)}
                    placeholder="Ajude o avaliador a entender..." 
                    className="w-full p-3.5 bg-[#0f172a]/50 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>

                <button 
                  onClick={() => removeQuestion(q.id)}
                  disabled={questions.length === 1}
                  aria-label={`Remover pergunta ${index + 1}`}
                  className={`mt-4 flex items-center gap-1.5 text-lg text-red-500 hover:underline hover:opacity-100 opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1 ${questions.length === 1 ? '' : ''}`}
                >
                  <Trash2 size={14} aria-hidden="true" /> Remover Pergunta
                </button>
              </div>
            ))}
          </div>

          <button 
            onClick={addQuestion}
            className="w-full py-4 bg-transparent border-2 border-dashed border-[#334155] text-[#94a3b8] rounded-lg font-semibold flex justify-center items-center gap-2 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-500/5 focus:ring-2 focus:ring-blue-500 transition-all mb-8"
          >
            <Plus size={20} aria-hidden="true" /> Adicionar Pergunta Manual
          </button>

          <div className="flex justify-end gap-4 pt-5 border-t border-[#334155]">
            <Link href="/" className="px-6 py-3 bg-transparent border border-[#334155] text-white rounded-lg hover:bg-[#334155] focus:ring-2 focus:ring-white transition-colors">
              Cancelar
            </Link>
            <button 
              onClick={handleSave}
              className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 transition-colors shadow-lg shadow-blue-500/20"
            >
              <Save size={18} aria-hidden="true" /> Salvar
            </button>
          </div>

        </main>
      </div>
    </div>
  );
}