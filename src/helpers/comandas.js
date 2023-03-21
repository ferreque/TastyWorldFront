// const url = "http://localhost:4005/api/comandas";
const url = "https://vercel.com/ferreque/tasty-world-back/api/comandas";

export const getComandas = async () => {
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

export const getComandasCocina = async () => {
  const resp = await fetch(`${url}/cocina`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": JSON.parse(localStorage.getItem("auth")).token,
    },
  });
  const datos = await resp.json();
  return datos;
};

export const getComandasBarra = async () => {
  const resp = await fetch(`${url}/barra`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": JSON.parse(localStorage.getItem("auth")).token,
    },
  });
  const datos = await resp.json();
  return datos;
};

export const getComandasEntregas = async () => {
  const resp = await fetch(`${url}/entregas`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": JSON.parse(localStorage.getItem("auth")).token,
    },
  });
  const datos = await resp.json();
  return datos;
};

export const postComandaAdmin = async (data) => {
  const resp = await fetch(`${url}/admin`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": JSON.parse(localStorage.getItem("auth")).token,
    },
  });
  const datos = await resp.json();

  return datos;
};

//Actualizar estado de comanda
export const putComanda = async (id, data) => {
  const resp = await fetch(`${url}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": JSON.parse(localStorage.getItem("auth")).token,
    },
  });
  const datos = await resp.json();

  return datos;
};

export const delComanda = async (id) => {
  const resp = await fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": JSON.parse(localStorage.getItem("auth")).token,
    },
  });
  const datos = await resp.json();

  return datos;
};
