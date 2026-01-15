"use client";

import React, {useState, useRef, useEffect} from "react";
import Link from "next/link";
import {Home, CheckCircle, AlertCircle, Upload, Plus, Save, Trash2, HelpCircle, PlusCircle} from "lucide-react";
import {SystemNav} from "@/components/SystemNav";
import {Footer} from "@/components/Footer";
import {api} from "@/services/api";
import {useProtectedPage} from "@/hooks/useProtectedPage";
import {Loader2} from "lucide-react";

export default function CadastroForms() {
  const {authorized, loading} = useProtectedPage(["admin", "engenheiro"]);

  const STANDARD_GROUPS = [
    "Ajuda os usuários a entender o que são as coisas e como usá-las?",
    "Reduz a carga cognitiva?",
    "Apoia conhecimentos e hábitos existentes",
    "Fornece suporte e treinamento?",
    "Dá suporte à memória e atenção?",
    "Fornece suporte a erros?",
    "Fornece feedback oportuno, adequado e consistente?",
    "Permite personalização, flexibilidade e alternativas?",
  ];

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [questions, setQuestions] = useState([{id: 1, text: "", example: "", scaleType: "5-point", group: ""}]);

  const [feedback, setFeedback] = useState({type: "", msg: ""});

  const fileInputRef = useRef(null);
  const feedbackRef = useRef(null);

  useEffect(() => {
    if (feedback.type && feedbackRef.current) {
      feedbackRef.current.focus();
    }
  }, [feedback]);

  const addQuestion = () => {
    const maxId = questions.length > 0 ? Math.max(...questions.map((q) => q.id)) : 0;
    const lastGroup = questions.length > 0 ? questions[questions.length - 1].group : "";
    setQuestions([...questions, {id: maxId + 1, text: "", example: "", scaleType: "5-point", group: lastGroup}]);
  };

  const removeQuestion = (id) => {
    if (questions.length <= 1) return;
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(questions.map((q) => (q.id === id ? {...q, [field]: value} : q)));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const lines = e.target.result.split(/\r?\n/).filter((line) => line.trim() !== "");
      if (lines.length === 0) {
        setFeedback({type: "error", msg: "O arquivo está vazio."});
        return;
      }
      let currentQuestions = [...questions];
      if (currentQuestions.length === 1 && currentQuestions[0].text.trim() === "") {
        currentQuestions = [];
      }
      const maxId = currentQuestions.length > 0 ? Math.max(...currentQuestions.map((q) => q.id)) : 0;

      let currentGroup = "";
      const newQs = [];
      let currentIdx = 0;

      lines.forEach((line) => {
        const content = line.trim();
        if (content.startsWith("#")) {
          const rawGroup = content.replace(/^#+\s*/, "").trim();
          // Fuzzy match against STANDARD_GROUPS
          let matchedGroup = rawGroup;

          // Remove punctuation and lowercase for comparison
          const cleanRaw = rawGroup.toLowerCase().replace(/[?.,]/g, "").trim();

          for (const std of STANDARD_GROUPS) {
            const cleanStd = std.toLowerCase().replace(/[?.,]/g, "").trim();
            if (cleanStd === cleanRaw || cleanStd.includes(cleanRaw) || cleanRaw.includes(cleanStd)) {
              matchedGroup = std;
              break;
            }
          }
          currentGroup = matchedGroup;
        } else {
          let qText = content;
          let qExample = "";
          const regex = /exemplo:/i;
          if (regex.test(content)) {
            const parts = content.split(regex);
            qText = parts[0].trim();
            qExample = parts.slice(1).join("exemplo:").trim();
          }
          newQs.push({
            id: maxId + currentIdx + 1,
            text: qText,
            example: qExample,
            scaleType: "5-point",
            group: currentGroup,
          });
          currentIdx++;
        }
      });

      setQuestions([...currentQuestions, ...newQs]);
      setFeedback({type: "info", msg: "Perguntas importadas!"});
      setTimeout(() => setFeedback({type: "", msg: ""}), 4000);
    };
    reader.onerror = () => setFeedback({type: "error", msg: "Erro ao ler o arquivo."});
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const resetForm = () => {
    setTitulo("");
    setDescricao("");
    setQuestions([{id: 1, text: "", example: "", scaleType: "5-point", group: ""}]);
    setFeedback({type: "", msg: ""});
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  const handleSave = async () => {
    if (!titulo.trim()) {
      setFeedback({type: "error", msg: "Preencha o título do formulário."});
      return;
    }

    try {
      const payload = {
        title: titulo,
        description: descricao,
        questions: questions.map((q) => ({
          text: q.text,
          example: q.example,
          scaleType: q.scaleType || "Likert 5-point",
          group: q.group,
        })),
      };

      await api.post("/forms", payload);
      setFeedback({type: "success", msg: "Formulário salvo com sucesso!"});
      setTimeout(() => resetForm(), 2000);
    } catch (err) {
      setFeedback({type: "error", msg: err.message || "Erro ao salvar formulário."});
    }
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  if (!authorized) return null;

  return (
    <div className="page-container flex flex-col font-sans">
      <SystemNav description="Avaliação de Acessibilidade" mode="admin" />

      <main className="mx-auto w-full max-w-4xl flex-1 px-5 pb-20">
        <div className="mb-8 border-b border-border pb-6">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Criar Novo Formulário</h1>
          <p className="text-muted-foreground">
            Configure as perguntas que serão apresentadas na interface de avaliação.
          </p>
        </div>

        {feedback.type && (
          <div
            ref={feedbackRef}
            tabIndex={-1}
            role={feedback.type === "error" ? "alert" : "status"}
            aria-live="assertive"
            className={`animate-fade-in mb-6 flex flex-col items-start rounded-lg border-l-4 p-4 outline-none ring-2 ring-primary ring-offset-2 ${feedback.type === "success" ? "border-primary bg-primary/10 text-primary" : ""} ${feedback.type === "error" ? "border-destructive bg-destructive/10 text-destructive" : ""} ${feedback.type === "info" ? "border-accent-foreground/50 bg-accent text-accent-foreground" : ""} `}
          >
            <div className="flex items-center gap-3 text-lg font-bold">
              {feedback.type === "success" && <CheckCircle aria-hidden="true" />}
              {feedback.type === "error" && <AlertCircle aria-hidden="true" />}
              {feedback.type === "info" && <CheckCircle aria-hidden="true" />}
              {feedback.msg}
            </div>

            {feedback.type === "success" && (
              <div className="ml-9 mt-4 flex gap-3">
                <Link
                  href="/"
                  className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 transition-colors hover:text-primary"
                >
                  <Home size={16} aria-hidden="true" /> Ir para o Início
                </Link>
                <button
                  onClick={resetForm}
                  className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 transition-colors hover:text-primary"
                >
                  <PlusCircle size={16} aria-hidden="true" /> Criar Novo
                </button>
              </div>
            )}
          </div>
        )}

        <section className="mb-8 flex flex-col gap-5" aria-label="Dados básicos do formulário">
          <div>
            <label htmlFor="titulo-form" className="mb-2 block text-lg font-medium text-muted-foreground">
              Título do Formulário *
            </label>
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
            <label htmlFor="desc-form" className="mb-2 block text-lg font-medium text-muted-foreground">
              Descrição
            </label>
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

        <section className="mb-8 rounded-xl border-2 border-dashed border-border bg-muted/30 p-8 text-center transition-colors hover:border-primary/50">
          <h3 className="mb-2 text-base font-medium text-foreground">Importar Perguntas (TXT)</h3>
          <p className="mb-4 text-lg text-muted-foreground">Cada linha do arquivo será uma nova pergunta.</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".txt,.md,.csv"
            className="hidden"
            aria-hidden="true"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 shadow-sm transition-all hover:border-primary hover:text-primary"
          >
            <Upload size={16} aria-hidden="true" /> Selecionar Arquivo
          </button>
        </section>

        <div className="mb-8 space-y-6" role="list" aria-label="Lista de perguntas">
          {questions.map((q, index) => (
            <div key={q.id} className="card-calm relative p-6" role="listitem">
              <div className="absolute right-6 top-6 font-bold text-muted-foreground opacity-30" aria-hidden="true">
                #{index + 1}
              </div>

              <div className="mb-4">
                <label htmlFor={`group-${q.id}`} className="mb-2 block text-sm font-medium text-muted-foreground">
                  Grupo / Tema (Opcional)
                </label>
                <select
                  id={`group-${q.id}`}
                  className="input-calm mb-4 cursor-pointer appearance-none"
                  value={q.group || ""}
                  onChange={(e) => updateQuestion(q.id, "group", e.target.value)}
                >
                  <option value="">Selecione um Grupo / Tema...</option>
                  {STANDARD_GROUPS.map((g, i) => (
                    <option key={i} value={g}>
                      {g}
                    </option>
                  ))}
                </select>

                <label htmlFor={`pergunta-${q.id}`} className="mb-2 block text-lg font-medium text-muted-foreground">
                  Pergunta {index + 1}
                </label>
                <input
                  id={`pergunta-${q.id}`}
                  type="text"
                  value={q.text}
                  onChange={(e) => updateQuestion(q.id, "text", e.target.value)}
                  placeholder="Digite a pergunta aqui..."
                  className="input-calm"
                />
              </div>

              <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
                <label
                  htmlFor={`exemplo-${q.id}`}
                  className="mb-2 flex items-center gap-1.5 text-lg font-semibold text-primary"
                >
                  <HelpCircle size={14} aria-hidden="true" /> Exemplo de Apoio (Contexto)
                </label>
                <input
                  id={`exemplo-${q.id}`}
                  type="text"
                  value={q.example}
                  onChange={(e) => updateQuestion(q.id, "example", e.target.value)}
                  placeholder="Ajude o avaliador a entender..."
                  className="w-full rounded-lg border border-primary/20 bg-background/50 p-3.5 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <button
                onClick={() => removeQuestion(q.id)}
                disabled={questions.length === 1}
                aria-label={`Remover pergunta ${index + 1}`}
                className={`mt-4 flex items-center gap-1.5 rounded p-1 text-lg text-destructive transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-destructive ${questions.length === 1 ? "cursor-not-allowed opacity-50" : ""}`}
              >
                <Trash2 size={14} aria-hidden="true" /> Remover Pergunta
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addQuestion}
          className="mb-8 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-transparent py-4 font-semibold text-muted-foreground transition-all hover:border-primary hover:bg-primary/5 hover:text-primary focus:ring-2 focus:ring-primary"
        >
          <Plus size={20} aria-hidden="true" /> Adicionar Pergunta Manual
        </button>

        <div className="flex justify-end gap-4 border-t border-border pt-5">
          <Link
            href="/"
            className="rounded-lg border border-border bg-transparent px-6 py-3 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:ring-2 focus:ring-primary"
          >
            Cancelar
          </Link>
          <button onClick={handleSave} className="btn-primary shadow-lg shadow-primary/20">
            <Save size={18} aria-hidden="true" /> Salvar
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
