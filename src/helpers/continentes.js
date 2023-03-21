// const url = "http://localhost:4005/api/continentes";
const url = "https://vercel.com/ferreque/tasty-world-back/api/continentes";

export const getContinentes = async (token) => {
  const resp = await fetch(`${url}`, {
    method: "GET",

    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": JSON.parse(localStorage.getItem("auth")).token,
    },
  });
  const datos = await resp.json();

  return datos;
};
