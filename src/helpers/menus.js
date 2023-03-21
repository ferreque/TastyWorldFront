// const url = "http://localhost:4005/api/productos";
const url = "https://vercel.com/ferreque/tasty-world-back/api/productos";

//Traer todos los menus
export const productosGet = async (desde) => {
  const resp = await fetch(`${url}?desde=${desde}`, {
    method: "GET",

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const datos = await resp.json();

  return datos;
};

export const getMenusCont = async (continente) => {
  const resp = await fetch(`${url}?continente=${continente}`, {
    method: "GET",

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const datos = await resp.json();

  return datos;
};

//Traer menu por Id
export const getMenu = async (id) => {
  const resp = await fetch(`${url}/${id}`, {
    method: "GET",

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const datos = await resp.json();

  return datos;
};

//Agregar menu
export const postMenu = async (data) => {
  const resp = await fetch(`${url}`, {
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

//Actualizar menu
export const putMenu = async (id, data) => {
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

//Borrar menu
export const deleteMenu = async (id) => {
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
