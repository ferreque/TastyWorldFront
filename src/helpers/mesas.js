// const url = "http://localhost:4005";
const url = "https://vercel.com/ferreque/tasty-world-back";

export const mesasGet = async () => {
  const resp = await fetch(`${url}/api/mesas`, {
    method: "GET",
    //?limite=${limite}&desde=${desde}
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const datos = await resp.json();

  return datos;
};

export const mesasTodasGet = async () => {
  const resp = await fetch(`${url}/api/mesas/todas`, {
    method: "GET",
    // ?limite=${limite}&desde=${desde}
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": JSON.parse(localStorage.getItem("auth")).token,
    },
  });
  const datos = await resp.json();

  return datos;
};

export const mesasPost = async (data) => {
  const resp = await fetch(`${url}/api/mesas`, {
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

export const mesasPut = async (id, data) => {
  const resp = await fetch(`${url}/api/mesas/${id}`, {
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

export const mesasDelete = async (id) => {
  const resp = await fetch(`${url}/api/mesas/${id}`, {
    method: "DELETE",

    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": JSON.parse(localStorage.getItem("auth")).token,
    },
  });
  const datos = await resp.json();

  return datos;
};
