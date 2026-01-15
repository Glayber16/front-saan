"use client";

import React, {useState, useEffect} from "react";
import {Save, Smartphone, Globe, Users, FileText, Loader2, AlertCircle} from "lucide-react";
import {SystemNav} from "@/components/SystemNav";
import {Footer} from "@/components/Footer";
import {api} from "@/services/api";
import {useProtectedPage} from "@/hooks/useProtectedPage";

export default function AplicacoesPage() {
  const {authorized, loading} = useProtectedPage(["admin", "engenheiro"]);
  const [loadingApp, setLoadingApp] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [forms, setForms] = useState([]);
  const [evaluators, setEvaluators] = useState([]);
  const [applications, setApplications] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    appType: "web",
    url: "",
    formId: "",
    evaluators: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setFetching(true);
      const [formsRes, usersRes, appsRes] = await Promise.all([
        api.get("/forms"),
        api.get("/users?role=avaliador"),
        api.get("/applications"),
      ]);
      setForms(formsRes || []);
      setEvaluators(usersRes || []);
      setApplications(appsRes || []);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar dados iniciais.");
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingApp(true);
    setError("");
    setSuccess("");

    if (!formData.formId) {
      setError("Selecione um formulário.");
      setLoadingApp(false);
      return;
    }

    try {
      await api.post("/applications", {
        name: formData.name,
        appType: formData.appType,
        url: formData.url,
        formId: parseInt(formData.formId),
        evaluators: formData.evaluators,
      });
      setSuccess("Aplicação cadastrada com sucesso!");
      setFormData({name: "", appType: "web", url: "", formId: "", evaluators: []});
      fetchData(); // Refresh list
    } catch (err) {
      setError(err.message || "Erro ao salvar aplicação.");
    } finally {
      setLoadingApp(false);
    }
  };

  const handleEvaluatorChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (const option of options) {
      if (option.selected) {
        selected.push(option.value);
      }
    }
    setFormData({...formData, evaluators: selected});
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
      <SystemNav description="Portal do Engenheiro" mode="admin" />

      <main className="mx-auto w-full max-w-4xl flex-1 px-5 pb-20">
        <div className="mb-8 border-b border-border pb-6">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Cadastrar Nova Aplicação</h1>
          <p className="text-muted-foreground">Associe um formulário a avaliadores para iniciar o ciclo de testes.</p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-500">
            <AlertCircle size={16} /> {success}
          </div>
        )}

        <section className="card-calm mb-12 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="app-name"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Nome da Aplicação *
              </label>
              <input
                id="app-name"
                type="text"
                placeholder="Ex: E-commerce Web"
                className="input-calm"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="app-type"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Tipo
                </label>
                <div className="relative">
                  <select
                    id="app-type"
                    className="input-calm cursor-pointer appearance-none"
                    value={formData.appType}
                    onChange={(e) => setFormData({...formData, appType: e.target.value})}
                  >
                    <option value="web">Aplicação Web</option>
                    <option value="mobile">Aplicação Mobile</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                    <Smartphone size={16} />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="app-url"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  URL (Opcional)
                </label>
                <input
                  id="app-url"
                  type="text"
                  placeholder="https://..."
                  className="input-calm"
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="form-select"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Formulário de Avaliação *
              </label>
              <div className="relative mb-4">
                <select
                  id="form-select"
                  className="input-calm cursor-pointer appearance-none"
                  value={formData.formId}
                  onChange={(e) => {
                    const fid = e.target.value;
                    setFormData((prev) => ({...prev, formId: fid}));
                  }}
                  disabled={fetching}
                  required
                >
                  <option value="">Selecione um formulário...</option>
                  {forms.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.title}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                  <FileText size={16} />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="evaluators-select"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Avaliadores * (Segure Ctrl para selecionar múltiplos)
              </label>
              <select
                id="evaluators-select"
                multiple
                className="input-calm h-40 py-2"
                value={formData.evaluators}
                onChange={handleEvaluatorChange}
                disabled={fetching}
              >
                {evaluators.map((u) => (
                  <option key={u.id} value={u.username}>
                    {u.username} ({u.role})
                  </option>
                ))}
              </select>
              <p className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                <Users size={14} /> {formData.evaluators.length} avaliadores selecionados.
              </p>
            </div>

            <div className="flex justify-end gap-4 border-t border-border pt-4">
              <button
                type="button"
                className="rounded-lg border border-border px-6 py-3 font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => setFormData({name: "", appType: "web", url: "", formId: "", evaluators: []})}
              >
                Limpar
              </button>

              <button type="submit" className="btn-primary" disabled={loadingApp}>
                {loadingApp ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />} Salvar Aplicação
              </button>
            </div>
          </form>
        </section>

        <section>
          <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-foreground">
            <Globe className="text-primary" size={24} /> Aplicações Cadastradas
          </h2>

          <div className="grid gap-4">
            {applications.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
                Nenhuma aplicação cadastrada ainda.
              </div>
            ) : (
              applications.map((app) => (
                <div key={app.id} className="rounded-lg border border-border bg-card p-4 shadow-sm">
                  <h3 className="text-lg font-bold">{app.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {app.appType} - {app.url}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
