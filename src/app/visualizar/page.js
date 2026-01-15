"use client";

import React, {useState, useEffect} from "react";
import {CheckCircle2, ClipboardList, Loader2, Send, AlertCircle} from "lucide-react";
import {SystemNav} from "@/components/SystemNav";
import {Footer} from "@/components/Footer";
import {api} from "@/services/api";
import {useRouter} from "next/navigation";
import {useProtectedPage} from "@/hooks/useProtectedPage";

export default function VisualizarPage() {
  const router = useRouter();
  const {authorized, loading: authLoading} = useProtectedPage(["avaliador", "admin", "engenheiro"]);
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState([]);
  const [forms, setForms] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    checkRoleAndLoad();
  }, []);

  const checkRoleAndLoad = async () => {
    setLoading(true);
    try {
      const me = await api.get("/auth/me");
      const role = me?.user?.role;
      setUserRole(role);

      if (role === "avaliador") {
        const res = await api.get("/my-assignments");
        setAssignments(res || []);
      } else {
        const res = await api.get("/forms");
        setForms(res.forms || res || []);
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar dados. Tente fazer login novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (appId, formId, questionId, value) => {
    const key = `${appId}_${formId}`;
    setAnswers((prev) => ({
      ...prev,
      [key]: {
        ...(prev[key] || {}),
        [questionId]: value,
      },
    }));
  };

  const handleSubmit = async (appId, formId) => {
    const key = `${appId}_${formId}`;
    const appAnswers = answers[key] || {};

    const assignment = assignments.find((a) => a.applicationId === appId);
    if (!assignment) return;

    const questions = assignment.form.questions;
    const answeredCount = Object.keys(appAnswers).length;

    if (answeredCount < questions.length) {
      alert("Por favor, responda todas as perguntas antes de enviar.");
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        applicationId: appId,
        formId: formId,
        answers: Object.entries(appAnswers).map(([qId, val]) => ({
          questionId: parseInt(qId),
          value: parseInt(val),
        })),
      };

      await api.post("/responses", payload);
      alert("Avaliação enviada com sucesso!");
      checkRoleAndLoad();
    } catch (err) {
      alert(err.message || "Erro ao enviar avaliação.");
    } finally {
      setSubmitting(false);
    }
  };

  const groupQuestions = (questions) => {
    const grouped = {};
    const groupsOrder = [];

    questions.forEach((q) => {
      const g = q.group || "Geral";
      if (!grouped[g]) {
        grouped[g] = [];
        groupsOrder.push(g);
      }
      grouped[g].push(q);
    });

    return {grouped, groupsOrder};
  };

  const [activeAssignment, setActiveAssignment] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const startEvaluation = (assignment) => {
    setActiveAssignment(assignment);
    setCurrentPage(0);
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  const handleNextPage = () => {
    if (!activeAssignment) return;

    const {grouped, groupsOrder} = groupQuestions(activeAssignment.form.questions);
    const currentGroup = groupsOrder[currentPage];
    const currentQs = grouped[currentGroup];

    const key = `${activeAssignment.applicationId}_${activeAssignment.form.id}`;
    const currentAnswers = answers[key] || {};

    let firstErrorId = null;
    for (const q of currentQs) {
      if (!currentAnswers[q.id]) {
        firstErrorId = q.id;
        break;
      }
    }

    if (firstErrorId) {
      const el = document.getElementById(`question-${firstErrorId}`);
      if (el) {
        el.scrollIntoView({behavior: "smooth", block: "center"});
        el.classList.add("ring-2", "ring-destructive");
        setTimeout(() => el.classList.remove("ring-2", "ring-destructive"), 2000);
      }
      alert("Por favor, responda todas as perguntas desta seção antes de prosseguir.");
      return;
    }

    if (currentPage < groupsOrder.length - 1) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({top: 0, behavior: "smooth"});
    } else {
      handleSubmit(activeAssignment.applicationId, activeAssignment.form.id);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({top: 0, behavior: "smooth"});
    }
  };

  const exitEvaluation = () => {
    if (
      confirm(
        "Deseja sair da avaliação? O progresso não salvo será perdido (exceto o estado atual da memória do navegador)."
      )
    ) {
      setActiveAssignment(null);
    }
  };

  if (authLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );

  if (!authorized) return null;

  return (
    <div className="page-container flex flex-col font-sans">
      <SystemNav description="Portal do Avaliador" />

      <main className="mx-auto w-full max-w-4xl flex-1 px-5 pb-20">
        <div className="mb-8 border-b border-border pb-6">
          <h1 className="mb-2 text-3xl font-bold text-foreground">
            {userRole === "avaliador" ? "Minhas Avaliações" : "Formulários Cadastrados"}
          </h1>
          <p className="text-muted-foreground">
            {userRole === "avaliador"
              ? activeAssignment
                ? `Avaliando: ${activeAssignment.applicationName}`
                : "Selecione uma aplicação para iniciar a avaliação."
              : "Visualização de formulários disponíveis no sistema."}
          </p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : userRole === "avaliador" ? (
          activeAssignment ? (
            (() => {
              const {grouped, groupsOrder} = groupQuestions(activeAssignment.form.questions);
              const currentGroup = groupsOrder[currentPage];
              const currentQs = grouped[currentGroup];
              const progress = ((currentPage + 1) / groupsOrder.length) * 100;

              return (
                <div className="animate-fade-in">
                  <div className="mb-8">
                    <div className="mb-2 flex justify-between text-sm text-muted-foreground">
                      <span>
                        Progresso: Passo {currentPage + 1} de {groupsOrder.length}
                      </span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full bg-primary transition-all duration-300" style={{width: `${progress}%`}} />
                    </div>
                  </div>

                  <div className="card-calm mb-8 border-primary/20 bg-primary/5 p-6">
                    <h2 className="mb-2 text-xl font-bold text-foreground">{currentGroup}</h2>
                    <p className="text-sm text-muted-foreground">Responda todas as perguntas abaixo para avançar.</p>
                  </div>

                  <div className="space-y-8">
                    {currentQs.map((q) => {
                      const absIdx = activeAssignment.form.questions.findIndex((x) => x.id === q.id);
                      return (
                        <div
                          id={`question-${q.id}`}
                          key={q.id}
                          className="rounded-lg border border-border bg-card p-6 transition-all duration-300"
                        >
                          <div className="mb-4 text-lg font-medium">
                            <span className="mr-2 text-muted-foreground">#{absIdx + 1}</span>
                            {q.text}
                          </div>

                          {q.example && (
                            <div className="mb-6 rounded-md border-l-4 border-primary/50 bg-muted p-4 text-sm italic text-muted-foreground">
                              <strong className="mb-1 block not-italic text-primary">Contexto/Exemplo:</strong>
                              {q.example}
                            </div>
                          )}

                          <div className="grid grid-cols-5 gap-2 md:gap-4">
                            {[1, 2, 3, 4, 5].map((val) => {
                              const isSelected =
                                answers[`${activeAssignment.applicationId}_${activeAssignment.form.id}`]?.[q.id] ===
                                val;

                              return (
                                <button
                                  key={val}
                                  type="button"
                                  onClick={() =>
                                    handleSelectOption(
                                      activeAssignment.applicationId,
                                      activeAssignment.form.id,
                                      q.id,
                                      val
                                    )
                                  }
                                  className={`flex flex-col items-center justify-center rounded-lg border p-3 text-center transition-all hover:scale-105 active:scale-95 ${
                                    isSelected
                                      ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                      : "border-border bg-background text-muted-foreground hover:border-primary hover:text-foreground"
                                  }`}
                                >
                                  <span className="mb-1 text-xl font-black">{val}</span>
                                  <span className="hidden text-[10px] font-semibold uppercase tracking-wider opacity-80 md:inline-block">
                                    {val === 1 && "Discordo"}
                                    {val === 5 && "Concordo"}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-12 flex justify-between border-t border-border pt-8">
                    <button
                      onClick={currentPage === 0 ? exitEvaluation : handlePrevPage}
                      className="px-6 py-3 font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {currentPage === 0 ? "Cancelar" : "Voltar"}
                    </button>

                    <button onClick={handleNextPage} disabled={submitting} className="btn-primary">
                      {submitting ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : currentPage === groupsOrder.length - 1 ? (
                        <span className="flex items-center gap-2">
                          Finalizar <Send size={18} />
                        </span>
                      ) : (
                        "Próxima Seção"
                      )}
                    </button>
                  </div>
                </div>
              );
            })()
          ) : assignments.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-muted/30 p-16 text-center text-muted-foreground">
              <ClipboardList size={64} className="mx-auto mb-6 opacity-30" />
              <h3 className="mb-2 text-xl font-semibold">Tudo certo por aqui!</h3>
              <p>Você não possui avaliações pendentes no momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {assignments.map((assignment) => (
                <div
                  key={assignment.applicationId}
                  className="card-calm group cursor-pointer overflow-hidden p-0 transition-colors hover:border-primary"
                  onClick={() => startEvaluation(assignment)}
                >
                  <div className="p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                        Pendente
                      </span>
                      <span className="text-xs text-muted-foreground">ID: {assignment.applicationId}</span>
                    </div>
                    <h2 className="mb-1 text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                      {assignment.applicationName}
                    </h2>
                    <p className="mb-4 text-sm text-muted-foreground">Formulário: {assignment.form.title}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-border bg-muted/50 p-4">
                    <span className="text-xs font-semibold text-muted-foreground">
                      {assignment.form.questions.length} Perguntas
                    </span>
                    <span className="flex items-center gap-1 text-sm font-bold text-primary">
                      Iniciar <Send size={14} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : forms.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
            <ClipboardList size={48} className="mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium">Nenhum formulário cadastrado</h3>
          </div>
        ) : (
          forms
            .slice()
            .reverse()
            .map((form, index) => (
              <div key={form.id} className="card-calm mb-12 p-6 md:p-8">
                <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                  <div>
                    <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                      Formulário #{forms.length - index}
                    </span>
                    <h2 className="text-2xl font-bold">{form.title}</h2>
                    <p className="text-lg text-muted-foreground">{form.description}</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {form.questions &&
                    form.questions.map((q, idx) => (
                      <div key={q.id} className="rounded-lg border border-border bg-card/50 p-6 opacity-80">
                        <div className="mb-4 text-lg font-medium">
                          {idx + 1}. {q.text}
                        </div>
                        {q.example && (
                          <div className="mb-4 rounded border-l-4 border-primary/20 bg-muted/50 p-3 text-sm italic text-muted-foreground">
                            Exemplo: {q.example}
                          </div>
                        )}
                        <div className="grid grid-cols-5 gap-2">
                          {[1, 2, 3, 4, 5].map((val) => (
                            <div
                              key={val}
                              className="flex flex-col items-center justify-center rounded-md border border-border bg-muted/30 p-3 text-center text-xs text-muted-foreground"
                            >
                              <span className="mb-1 text-lg">{val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))
        )}
      </main>

      <Footer />
    </div>
  );
}
