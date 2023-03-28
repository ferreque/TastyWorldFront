const url = "http://localhost:4005/api/bebidas";
//const url = "https://tasty-world-back.vercel.app/api/bebidas";

export const getBebidas = async (token) => {
  const resp = await fetch(`${url}/all`, {
    method: "GET",

    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": token,
    },
  });
  const datos = await resp.json();

  return datos;
};

export const getBebida = async (id, token) => {
  const resp = await fetch(`${url}/${id}`, {
    method: "GET",

    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": token,
    },
  });
  const datos = await resp.json();

  return datos;
};

export const postBebida = async (data, token) => {
  const resp = await fetch(`${url}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": token,
    },
  });
  const datos = await resp.json();

  return datos;
};

export const putBebida = async (id, data, token) => {
  const resp = await fetch(`${url}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": token,
    },
  });
  const datos = await resp.json();

  return datos;
};

export const deleteBebida = async (id, token) => {
  const resp = await fetch(`${url}/${id}`, {
    method: "DELETE",

    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": token,
    },
  });
  const datos = await resp.json();

  return datos;
};
