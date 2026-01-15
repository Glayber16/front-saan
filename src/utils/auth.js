/**
 * Verifica se o usuário está autenticado checando a existência do cookie access_token
 * @returns {boolean}
 */
export const checkAuth = () => {
  if (typeof document === "undefined") return false;
  const hasCookie = document.cookie.split(";").some((item) => item.trim().startsWith("access_token="));
  const hasStorage = localStorage.getItem("auth_state") === "true";
  return hasCookie || hasStorage;
};
