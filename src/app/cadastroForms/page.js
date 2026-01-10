"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Home, CheckCircle, AlertCircle, Upload, 
  Plus, Save, Trash2, HelpCircle, PlusCircle 
} from 'lucide-react';
import { SystemNav } from '@/components/SystemNav';
import { Footer } from '@/components/Footer';

export default function CadastroForms() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [questions, setQuestions] = useState([
    { id: 1, text: '', example: '', scaleType: '5-point' }
  ]);
  
  const [feedback, setFeedback] = useState({ type: '', msg: '' });
  
  const fileInputRef = useRef(null);
  const feedbackRef = useRef(null);

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
    // Lógica de salvamento...
    setFeedback({ type: 'success', msg: 'Formulário salvo com sucesso!' });
  };

  return (
    
    <div className="page-container font-sans flex flex-col">
      
      <SystemNav description="Avaliação de Acessibilidade" mode="admin" />
        
      <main className="flex-1 max-w-4xl w-full mx-auto px-5 pb-20">
        
       
        <div className="mb-8 border-b border-border pb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Criar Novo Formulário</h1>
          <p className="text-muted-foreground">Configure as perguntas que serão apresentadas na interface de avaliação.</p>
        </div>

        
        {feedback.type && (
          <div 
            ref={feedbackRef}
            tabIndex={-1}
            role={feedback.type === 'error' ? 'alert' : 'status'} 
            aria-live="assertive"
           
            className={`p-4 rounded-lg mb-6 border-l-4 flex flex-col items-start animate-fade-in outline-none ring-2 ring-offset-2 ring-primary
              ${feedback.type === 'success' ? 'bg-primary/10 border-primary text-primary' : ''}
              ${feedback.type === 'error' ? 'bg-destructive/10 border-destructive text-destructive' : ''}
              ${feedback.type === 'info' ? 'bg-accent border-accent-foreground/50 text-accent-foreground' : ''}
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
                <Link href="/" className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-md hover:text-primary transition-colors">
                  <Home size={16} aria-hidden="true" /> Ir para o Início
                </Link>
                <button onClick={resetForm} className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-md hover:text-primary transition-colors">
                  <PlusCircle size={16} aria-hidden="true" /> Criar Novo
                </button>
              </div>
            )}
          </div>
        )}

       
        <section className="flex flex-col gap-5 mb-8" aria-label="Dados básicos do formulário">
          <div>
            <label htmlFor="titulo-form" className="block text-muted-foreground font-medium mb-2 text-lg">Título do Formulário *</label>
            <input 
              id="titulo-form"
              type="text" 
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ex: Avaliação de Contraste" 
              className="input-calm" 
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="desc-form" className="block text-muted-foreground font-medium mb-2 text-lg">Descrição</label>
            <textarea 
              id="desc-form"
              rows={2} 
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Objetivo da avaliação..." 
              className="input-calm"
            />
          </div>
        </section>

       
        <section className="border-2 border-dashed border-border rounded-xl p-8 text-center mb-8 bg-muted/30 hover:border-primary/50 transition-colors">
          <h3 className="mb-2 text-base font-medium text-foreground">Importar Perguntas (TXT)</h3>
          <p className="text-muted-foreground text-lg mb-4">Cada linha do arquivo será uma nova pergunta.</p>
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".txt,.md,.csv" className="hidden" aria-hidden="true" />
          <button 
            onClick={() => fileInputRef.current.click()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-card border border-border rounded-md hover:text-primary hover:border-primary shadow-sm transition-all"
          >
            <Upload size={16} aria-hidden="true" /> Selecionar Arquivo
          </button>
        </section>

      
        <div className="space-y-6 mb-8" role="list" aria-label="Lista de perguntas">
          {questions.map((q, index) => (
    
            <div key={q.id} className="card-calm p-6 relative" role="listitem">
              <div className="absolute top-6 right-6 text-muted-foreground font-bold opacity-30" aria-hidden="true">
                #{index + 1}
              </div>

              <div className="mb-4">
                <label htmlFor={`pergunta-${q.id}`} className="block text-muted-foreground font-medium mb-2 text-lg">
                  Pergunta {index + 1}
                </label>
                <input 
                  id={`pergunta-${q.id}`}
                  type="text" 
                  value={q.text}
                  onChange={(e) => updateQuestion(q.id, 'text', e.target.value)}
                  placeholder="Digite a pergunta aqui..." 
                  className="input-calm"
                />
              </div>

              
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-4">
                <label htmlFor={`exemplo-${q.id}`} className="text-primary text-lg font-semibold mb-2 flex items-center gap-1.5">
                  <HelpCircle size={14} aria-hidden="true" /> Exemplo de Apoio (Contexto)
                </label>
                <input 
                  id={`exemplo-${q.id}`}
                  type="text" 
                  value={q.example}
                  onChange={(e) => updateQuestion(q.id, 'example', e.target.value)}
                  placeholder="Ajude o avaliador a entender..." 
                  className="w-full p-3.5 bg-background/50 border border-primary/20 rounded-lg text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              <button 
                onClick={() => removeQuestion(q.id)}
                disabled={questions.length === 1}
                aria-label={`Remover pergunta ${index + 1}`}
                className={`mt-4 flex items-center gap-1.5 text-lg text-destructive hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-destructive rounded p-1 ${questions.length === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Trash2 size={14} aria-hidden="true" /> Remover Pergunta
              </button>
            </div>
          ))}
        </div>

      
        <button 
          onClick={addQuestion}
          className="w-full py-4 bg-transparent border-2 border-dashed border-border text-muted-foreground rounded-lg font-semibold flex justify-center items-center gap-2 hover:border-primary hover:text-primary hover:bg-primary/5 focus:ring-2 focus:ring-primary transition-all mb-8"
        >
          <Plus size={20} aria-hidden="true" /> Adicionar Pergunta Manual
        </button>

        
        <div className="flex justify-end gap-4 pt-5 border-t border-border">
          <Link href="/" className="px-6 py-3 bg-transparent border border-border text-muted-foreground rounded-lg hover:bg-muted hover:text-foreground focus:ring-2 focus:ring-primary transition-colors">
            Cancelar
          </Link>
          <button 
            onClick={handleSave}
            className="btn-primary shadow-lg shadow-primary/20"
          >
            <Save size={18} aria-hidden="true" /> Salvar
          </button>
        </div>

      </main>
      
      <Footer />
    </div>
  );
}