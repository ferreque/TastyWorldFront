// const url = "http://localhost:4005/api";
const url = "https://vercel.com/ferreque/tasty-world-back/api";

export const postAuth = async (data) => {
  const resp = await fetch(`${url}/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const datos = await resp.json();

  return datos;
};
