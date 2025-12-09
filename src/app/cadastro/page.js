// src/app/cadastro/page.js
"use client";

import { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  LayoutTemplate, Home, PlusCircle, CheckCircle, AlertCircle, 
  Upload, Plus, Save, Trash2, HelpCircle 
} from 'lucide-react';

export default function CadastroPage() {
  // --- ESTADOS ---
  const [questions, setQuestions] = useState([{ id: 1, text: '', example: '', scaleType: '5-point' }]);
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [feedback, setFeedback] = useState(null);
  const fileInputRef = useRef(null);

  // --- LÓGICA (Mantida igual) ---
  const addQuestion = () => {
    const maxId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) : 0;
    setQuestions([...questions, { id: maxId + 1, text: '', example: '', scaleType: '5-point' }]);
  };

  const removeQuestion = (id) => {
    if (questions.length <= 1) return;
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q));
  };

  const resetForm = () => {
    setFormTitle('');
    setFormDesc('');
    setQuestions([{ id: 1, text: '', example: '', scaleType: '5-point' }]);
    setFeedback(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const lines = e.target.result.split(/\r?\n/).filter(line => line.trim() !== '');
      if (lines.length === 0) { showFeedback('empty'); return; }
      
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
      showFeedback('import');
      event.target.value = '';
    };
    reader.onerror = () => showFeedback('error');
    reader.readAsText(file);
  };

  const handleSave = async () => {
    if (!formTitle.trim()) { showFeedback('validation'); return; }
    const payload = { title: formTitle, description: formDesc, questions };

    try {
      const res = await fetch('http://localhost:5000/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setFeedback('success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else { showFeedback('error'); }
    } catch (e) { console.error(e); showFeedback('error'); }
  };

  const showFeedback = (type) => {
    setFeedback(type);
    if (type !== 'success') setTimeout(() => setFeedback(null), 4000);
  };

  // --- RENDERIZAÇÃO COM TAILWIND (estilos inline/tailwind sem arquivo externo) ---
  return (
    <>
      {/* Global variables + small base rules (keeps look similar to your CSS) */}
      <style jsx global>{`
        :root {
          --primary: #3b82f6;
          --danger: #ef4444;
        }
        /* smooth placeholder alpha similar to original */
        ::placeholder { opacity: 0.4; }
      `}</style>

      <div className="min-h-screen pb-20 bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
        
        {/* NAVBAR */}
        <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-b border-gray-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="font-bold text-lg flex items-center gap-2 text-indigo-600">
            <LayoutTemplate size={22} /> 
            <span>Avaliação de Acessibilidade</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-gray-600 dark:text-slate-300 hover:text-indigo-600 transition-colors">Início</Link>
            <Link href="/visualizar" className="text-gray-600 dark:text-slate-300 hover:text-indigo-600 transition-colors">Visualizar</Link>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 mt-10">
          
          {/* CABEÇALHO DA PÁGINA */}
          <header className="mb-10 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Criar Novo Formulário</h1>
            <p className="text-gray-600 dark:text-slate-300 text-lg">
              Configure as perguntas que serão apresentadas na interface de avaliação.
            </p>
          </header>

          <main>
            {/* --- FEEDBACK ALERTS --- */}
            {feedback === 'success' && (
              <div className="mb-8 p-6 rounded-xl bg-green-50 border-l-4 border-green-500 text-green-700 dark:text-green-300">
                <div className="flex items-center gap-3 font-bold text-lg mb-2">
                  <CheckCircle /> <span>Salvo com sucesso!</span>
                </div>
                <p className="mb-4 ml-9 opacity-90">O formulário está pronto. O que deseja fazer?</p>
                <div className="ml-9 flex gap-4">
                  <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 font-medium hover:border-green-500 transition-colors">
                    <Home size={16} /> Início
                  </Link>
                  <button type="button" onClick={resetForm} className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                    <PlusCircle size={16} /> Novo
                  </button>
                </div>
              </div>
            )}

            {/* Outros Feedbacks */}
            {feedback && feedback !== 'success' && (
              <div className={`mb-8 p-4 rounded-lg border-l-4 flex items-center gap-3 font-medium ${
                feedback === 'import' ? 'bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-red-50 border-red-500 text-red-600'
              }`}>
                {feedback === 'import' ? <CheckCircle /> : <AlertCircle />}
                <span>
                  {feedback === 'import' && 'Perguntas importadas! Preencha os exemplos.'}
                  {feedback === 'error' && 'Erro ao salvar. Verifique o servidor.'}
                  {feedback === 'validation' && 'Preencha o título do formulário.'}
                  {feedback === 'empty' && 'Arquivo vazio ou inválido.'}
                </span>
              </div>
            )}

            {/* --- DADOS GERAIS --- */}
            <section className="flex flex-col gap-6 mb-10">
              <div>
                <label htmlFor="form-title" className="block text-sm font-semibold text-gray-600 dark:text-slate-300 mb-2">
                  Título do Formulário *
                </label>
                <input 
                  type="text" 
                  id="form-title" 
                  placeholder="Ex: Avaliação de Contraste para Daltônicos"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full p-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all shadow-sm placeholder:text-gray-400 dark:placeholder:text-slate-400"
                />
              </div>
              <div>
                <label htmlFor="form-desc" className="block text-sm font-semibold text-gray-600 dark:text-slate-300 mb-2">
                  Descrição
                </label>
                <textarea 
                  id="form-desc" 
                  rows="2" 
                  placeholder="Objetivo da avaliação..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full p-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all shadow-sm placeholder:text-gray-400 dark:placeholder:text-slate-400 resize-none"
                />
              </div>
            </section>

            {/* --- UPLOAD AREA --- */}
            <section className="mb-10 p-8 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl bg-white/50 dark:bg-slate-800/50 text-center hover:bg-white dark:hover:bg-slate-800 transition-colors">
              <h3 className="font-bold mb-2">Importar Perguntas (TXT)</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">
                Cada linha do arquivo será transformada em uma nova pergunta.
              </p>
              <input 
                type="file" 
                accept=".txt,.md,.csv" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <button 
                type="button" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg font-medium hover:border-indigo-500 hover:text-indigo-600 transition-all shadow-sm"
                onClick={() => fileInputRef.current.click()}
              >
                <Upload size={18} /> Selecionar Arquivo
              </button>
            </section>

            {/* --- LISTA DE PERGUNTAS --- */}
            <div className="space-y-6 mb-10">
              {questions.map((q, index) => (
                <div key={q.id} className="relative p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-sm group hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors">
                  <div className="absolute top-6 right-6 font-bold text-4xl text-gray-200 dark:text-slate-800 pointer-events-none">
                    #{index + 1}
                  </div>
                  
                  <div className="mb-4 relative z-10">
                    <label className="block text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">Pergunta</label>
                    <input 
                      type="text" 
                      value={q.text}
                      placeholder="Digite a pergunta aqui..."
                      onChange={(e) => updateQuestion(q.id, 'text', e.target.value)}
                      className="w-full bg-transparent border-b-2 border-gray-200 dark:border-slate-700 py-2 text-lg font-medium focus:outline-none focus:border-indigo-500 placeholder:text-gray-400 dark:placeholder:text-slate-400 transition-colors"
                    />
                  </div>

                  <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
                    <span className=" text-xs font-bold text-indigo-600 mb-2 flex items-center gap-1">
                      <HelpCircle size={12} /> EXEMPLO DE APOIO (CONTEXTO)
                    </span>
                    <input 
                      type="text" 
                      className="w-full bg-transparent text-sm focus:outline-none placeholder:text-gray-400 dark:placeholder:text-slate-400"
                      value={q.example}
                      placeholder="Ajude o avaliador a entender o contexto dessa pergunta..."
                      onChange={(e) => updateQuestion(q.id, 'example', e.target.value)}
                    />
                  </div>

                  <button 
                    type="button" 
                    className="mt-4 text-red-600 text-sm font-medium flex items-center gap-1 opacity-80 hover:opacity-100 hover:underline transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    onClick={() => removeQuestion(q.id)}
                    disabled={questions.length === 1}
                  >
                    <Trash2 size={14} /> Remover Pergunta
                  </button>
                </div>
              ))}
            </div>

            <button 
              type="button" 
              className="w-full py-5 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl text-gray-500 dark:text-slate-400 font-bold flex justify-center items-center gap-2 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all mb-12"
              onClick={addQuestion}
            >
              <Plus size={20} /> Adicionar Pergunta Manual
            </button>

            {/* --- RODAPÉ (fixed) --- */}
            <div className="fixed bottom-0 left-0 w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-t border-gray-200 dark:border-slate-700 p-4 z-40">
              <div className="max-w-4xl mx-auto flex justify-end gap-4">
                <Link href="/">
                  <button type="button" className="px-6 py-3 rounded-lg font-medium text-gray-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    Cancelar
                  </button>
                </Link>
                <button 
                  type="button" 
                  className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 hover:shadow-indigo-200 transform transition-all flex items-center gap-2"
                  onClick={handleSave}
                >
                  <Save size={18} /> Salvar Formulário
                </button>
              </div>
            </div> 

          </main>
        </div>
      </div>
    </>
  );
}
