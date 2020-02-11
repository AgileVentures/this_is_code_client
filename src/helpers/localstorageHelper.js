const headers = ["access-token", "token-type", "client", "expiry", "uid"];

export const getCurrentCredentials = () => {
  return Object.assign(
    ...headers.map(el => ({ [el]: localStorage.getItem(el) }))
  );
};

export const setCurrentCredentials = creds => {
  return headers.forEach(el => localStorage.setItem(el, creds[el]));
};