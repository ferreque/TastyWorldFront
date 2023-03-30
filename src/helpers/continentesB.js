// const url = "http://localhost:4005/api/continentesB";
const url = "https://tasty-world-back.vercel.app/api/continentesB";

export const getContinentesB = async (token) => {
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
