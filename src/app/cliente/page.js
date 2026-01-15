"use client";

import React, {useState, useEffect} from "react";
import {Search, BarChart3, HelpCircle, FileText, Loader2, Download} from "lucide-react";
import {SystemNav} from "@/components/SystemNav";
import {Footer} from "@/components/Footer";
import {api} from "@/services/api";
import {useProtectedPage} from "@/hooks/useProtectedPage";

export default function ClientePage() {
  const {authorized, loading: authLoading} = useProtectedPage(["stakeholder"]);
  const [loading, setLoading] = useState(false);
  const [apps, setApps] = useState([]);
  const [selectedAppId, setSelectedAppId] = useState("");
  const [report, setReport] = useState(null);

  useEffect(() => {
    api
      .get("/applications")
      .then((res) => setApps(res || []))
      .catch((err) => console.error("Erro ao carregar apps", err));
  }, []);

  const handleSearch = async () => {
    if (!selectedAppId) return;
    setLoading(true);
    setReport(null);
    try {
      const res = await api.get(`/reports/application-score?applicationId=${selectedAppId}`);
      setReport(res);
    } catch (err) {
      console.error(err);
      alert("Erro ao buscar nota.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!selectedAppId) return;
    try {
      const res = await fetch(`/api/reports/export-pdf?applicationId=${selectedAppId}`);

      if (!res.ok) {
        throw new Error("Erro ao baixar PDF");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `relatorio_${selectedAppId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Erro ao baixar PDF. Tente novamente.");
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
      <SystemNav description="Portal do Cliente" />

      <main className="mx-auto w-full max-w-4xl flex-1 px-5 pb-20">
        <div className="mb-8 border-b border-border pb-6">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Nota de Acessibilidade</h1>
          <p className="text-muted-foreground">
            Selecione a aplicação para visualizar a nota agregada (0 a 10) com base nas avaliações concluídas.
          </p>
        </div>

        <section className="card-calm mb-12 p-6 shadow-lg md:p-8">
          <form className="flex flex-col items-end gap-4 md:flex-row">
            <div className="w-full flex-1">
              <label
                htmlFor="app-select"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Aplicação
              </label>
              <div className="relative">
                <select
                  id="app-select"
                  className="input-calm cursor-pointer appearance-none"
                  value={selectedAppId}
                  onChange={(e) => setSelectedAppId(e.target.value)}
                >
                  <option value="">Selecione uma aplicação...</option>
                  {apps.map((app) => (
                    <option key={app.id} value={app.id}>
                      {app.name}
                    </option>
                  ))}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                  <BarChart3 size={16} />
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn-primary w-full shadow-lg shadow-primary/20 md:w-auto"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />} Ver Nota
            </button>
          </form>
        </section>

        <section className="card-calm relative overflow-hidden p-8 text-center shadow-2xl">
          {report && (
            <div className="absolute right-4 top-4">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 rounded-lg border border-border bg-card p-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                title="Baixar Relatório PDF"
              >
                <Download size={18} />
                <span className="hidden sm:inline">Baixar PDF</span>
              </button>
            </div>
          )}

          <div className="mb-6 flex items-center justify-center gap-2 font-medium text-muted-foreground">
            Índice de Acessibilidade
            <HelpCircle
              size={14}
              className="cursor-help text-muted-foreground"
              title="Baseado na escala Likert Linear"
            />
          </div>

          <div className="mb-8">
            <span className="text-7xl font-black tracking-tighter text-muted-foreground/30 md:text-8xl">
              {report?.score !== null && report?.score !== undefined ? report.score : "--"}
            </span>
            <span className="ml-2 text-2xl font-medium text-muted-foreground">/ 10</span>
          </div>

          <div className="mx-auto mb-8 h-4 w-full max-w-md overflow-hidden rounded-full border border-border bg-muted">
            <div
              className="h-full bg-primary transition-all duration-1000 ease-out"
              style={{width: `${(report?.score || 0) * 10}%`}}
            ></div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 border-t border-border pt-6 text-lg text-muted-foreground md:gap-8">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-primary" />
              <span>{report?.countResponses || 0} avaliações</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 size={16} className="text-primary" />
              <span>{report?.countAnswers || 0} respostas contabilizadas</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded border border-border bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">
                MÉTODO: MULTI-PERFIL
              </span>
            </div>
          </div>

          {report?.neuroScores && Object.keys(report.neuroScores).length > 0 && (
            <div className="mt-12 border-t border-border pt-8">
              <h3 className="mb-6 text-xl font-bold text-foreground">Detalhamento por Neurodivergência</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(report.neuroScores).map(([key, value]) => {
                  const score = value !== null ? value : 0;
                  let colorClass = "text-destructive";
                  if (score >= 8) colorClass = "text-emerald-500";
                  else if (score >= 5) colorClass = "text-yellow-500";

                  return (
                    <div
                      key={key}
                      className="flex flex-col rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md"
                    >
                      <span className="mb-2 text-sm font-semibold uppercase text-muted-foreground">{key}</span>
                      <div className="flex items-end justify-between">
                        <span className={`text-3xl font-bold ${colorClass}`}>{value !== null ? value : "--"}</span>
                        <span className="mb-1 text-xs text-muted-foreground">/ 10</span>
                      </div>
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className={`h-full ${score >= 8 ? "bg-emerald-500" : score >= 5 ? "bg-yellow-500" : "bg-destructive"}`}
                          style={{width: `${score * 10}%`}}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
