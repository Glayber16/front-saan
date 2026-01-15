export const api = {
  async post(endpoint, data) {
    const res = await fetch(`/api${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        alert("Sem permissão: Você não tem acesso a este recurso.");
      }

      let message = "Erro na requisição";
      try {
        const json = await res.json();
        message = json.detail || message;
      } catch (e) {}

      throw new Error(message);
    }

    return res.json();
  },

  async get(endpoint) {
    const res = await fetch(`/api${endpoint}`);
    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        alert("Sem permissão: Você não tem acesso a este recurso.");
      }

      let message = "Erro na requisição";
      try {
        const json = await res.json();
        message = json.detail || message;
      } catch (e) {}

      throw new Error(message);
    }
    return res.json();
  },
};
