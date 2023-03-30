import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Edit, Trash } from "react-feather"; //ChevronDown, Plus, MoreVertical,
import { getProductos, deleteProducto } from "../helpers/productos";
import { getBebidas, deleteBebida } from "../helpers/bebidas";
import { getComandas, delComanda } from "../helpers/comandas";
import { usuariosGet, usuarioDelete } from "../helpers/usuarios";
import ModalUsuarios from "./ModalUsuarios";
import ModalProductos from "./ModalProductos";
import ModalBebidas from "./ModalBebidas";
import ModalComandas from "./ModalComanda";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";

const Administracion = () => {
  const [render, setRender] = useState(false);
  const [toggleProducto, setToggleProducto] = useState(false);
  const [toggleBebida, setToggleBebida] = useState(false);
  const [toggleComanda, setToggleComandas] = useState(false);
  const [toggleUsuarios, setToggleUsuarios] = useState(false);
  const [products, setProducts] = useState({ datos: [], loading: true });
  const [bebidas, setBebidas] = useState({ datos: [], loading: true });
  const [comanda, setComandas] = useState({ datos: [], loading: true });
  const [usuarios, setUsuarios] = useState({ datos: [], loading: true });
  const [productEditar, setProductEditar] = useState({});
  const [bebidaEditar, setBebidaEditar] = useState({});
  const [comandaEditar, setComandaEditar] = useState({});
  const [usuarioEditar, setUsuarioEditar] = useState({});

  const user =
    JSON.parse(localStorage.getItem("auth")) &&
    JSON.parse(localStorage.getItem("auth")).usuario;
  const token =
    JSON.parse(localStorage.getItem("auth")) &&
    JSON.parse(localStorage.getItem("auth")).token;
  const history = useHistory();

  const handleDeleteProducto = (product) => {
    Swal.fire({
      title: "¿Seguro que quieres eliminar el producto?",
      text: "No puedes revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProducto(product._id, token).then((respuesta) => {
          if (respuesta.msg) {
            Swal.fire({
              title: respuesta.msg,
              icon: "success",
              confirmButtonColor: "#3085d6",
            });
            setRender(!render);
          }
        });
      }
    });
  };
  const handleEditProducto = (product) => {
    setProductEditar(product);
    setToggleProducto(true);
  };

  useEffect(() => {
    getProductos(token).then((respuesta) => {
      setProducts({
        datos: respuesta.producto,
        loading: false,
      });
    });
    usuariosGet().then((respuesta) => {
      setUsuarios({
        datos: respuesta.usuarios,
        loading: false,
      });
    });
  }, [render]);

  useEffect(() => {
    const redireccion = () =>
      (user && user.rol === "ADMIN_ROLE") || history.push("/login");
    redireccion();
  }, []);

  const handleDeleteBebida = (bebida) => {
    Swal.fire({
      title: "¿Seguro que quieres eliminar la bebida?",
      text: "No puedes revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBebida(bebida._id, token).then((respuesta) => {
          if (respuesta.msg) {
            Swal.fire({
              title: respuesta.msg,
              icon: "success",
              confirmButtonColor: "#3085d6",
            });
            setRender(!render);
          }
        });
      }
    });
  };
  const handleEditBebida = (bebida) => {
    setBebidaEditar(bebida);
    setToggleBebida(true);
  };

  useEffect(() => {
    getBebidas(token).then((respuesta) => {
      setBebidas({
        datos: respuesta.trago,
        loading: false,
      });
    });
    usuariosGet().then((respuesta) => {
      setUsuarios({
        datos: respuesta.usuarios,
        loading: false,
      });
    });
  }, [render]);

  const handleDeleteComanda = (comanda) => {
    Swal.fire({
      title: "¿Seguro que quieres eliminar la comanda?",
      text: "No puedes revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        delComanda(comanda._id, token).then((respuesta) => {
          if (respuesta.msg) {
            Swal.fire({
              title: respuesta.msg,
              icon: "success",
              confirmButtonColor: "#3085d6",
            });
            setRender(!render);
          }
        });
      }
    });
  };

  const handleEditComanda = (comanda) => {
    setComandaEditar(comanda);
    setToggleComandas(true);
  };

  useEffect(() => {
    getComandas(token).then((respuesta) => {
      let todas = respuesta.comanda;
      let activas =
        todas &&
        todas.filter((comanda) => {
          return comanda.estado !== "Entregado" || "Anulado";
        });
      setComandas({
        datos: activas,
        loading: false,
      });
    });
  }, [render]);

  //------------------------------------------------
  const handleDeleteUsuario = (usuario) => {
    Swal.fire({
      title: "¿Seguro que quieres eliminar este usuario?",
      text: "No puedes revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        usuarioDelete(usuario.uid, token).then((respuesta) => {
          if (respuesta.msg) {
            Swal.fire({
              title: "Tasty usuario eliminado",
              icon: "success",
              confirmButtonColor: "#3085d6",
            });
            setRender(!render);
          }
        });
      }
    });
  };

  const handleEditUsuario = (usuario) => {
    setUsuarioEditar(usuario);
    setToggleUsuarios(true);
  };

  const columnasProductos = [
    {
      name: "NOMBRE",
      selector: (row) => row.nombre,
      sortable: true,
      width: "29%",
    },
    {
      name: "PRECIO",
      selector: (row) => row.precio,
      sortable: true,
      width: "29%",
    },
    {
      name: "PAIS",
      selector: (row) => row.pais,
      sortable: true,
      width: "29%",
    },
    {
      name: "ACCIONES",
      allowOverflow: true,
      center: true,
      width: "10%",
      cell: (row) => {
        return (
          <div className="d-flex">
            <button className="dropdown-item">
              <Edit onClick={() => handleEditProducto(row)} size={15} />
            </button>
            <button className="dropdown-item">
              <Trash onClick={() => handleDeleteProducto(row)} size={15} />
            </button>
          </div>
        );
      },
    },
  ];

  const columnasBebidas = [
    {
      name: "NOMBRE",
      selector: (row) => row.nombre,
      sortable: true,
      width: "29%",
    },
    {
      name: "PRECIO",
      selector: (row) => row.precio,
      sortable: true,
      width: "29%",
    },
    {
      name: "TIPO ",
      selector: (row) => row.continenteB,
      sortable: true,
      width: "29%",
    },
    {
      name: "ACCIONES",
      allowOverflow: true,
      center: true,
      width: "10%",
      cell: (row) => {
        return (
          <div className="d-flex">
            <button className="dropdown-item">
              <Edit onClick={() => handleEditBebida(row)} size={15} />
            </button>
            <button className="dropdown-item">
              <Trash onClick={() => handleDeleteBebida(row)} size={15} />
            </button>
          </div>
        );
      },
    },
  ];

  const columnasComandas = [
    {
      name: "NUMERO",
      selector: (row) => row.numeroPedido,
      sortable: true,
      width: "10%",
    },
    {
      name: "ESTADO",
      selector: (row) => row.estado,
      sortable: true,
      width: "20%",
    },
    {
      name: "USUARIO",
      selector: (row) => row.nombreCliente,
      sortable: true,
      width: "25%",
    },
    {
      name: "PRODUCTO",
      selector: (row) => row.producto,
      sortable: true,
      width: "30%",
    },
    {
      name: "ACCIONES",
      allowOverflow: true,
      center: true,
      width: "15%",
      cell: (row) => {
        return (
          <div className="d-flex">
            <button className="dropdown-item">
              <Edit onClick={() => handleEditComanda(row)} size={15} />
            </button>
            <button className="dropdown-item">
              <Trash onClick={() => handleDeleteComanda(row)} size={15} />
            </button>
          </div>
        );
      },
    },
  ];

  //-------------------------------------------------------

  const columnasUsuarios = [
    {
      name: "NOMBRE USUARIO",
      selector: (row) => row.nombre,
      sortable: true,
      width: "29%",
    },
    {
      name: "EMAIL USUARIO",
      selector: (row) => row.email,
      sortable: true,
      width: "29%",
    },
    {
      name: "ROL",
      selector: (row) => row.rol,
      sortable: true,
      width: "29%",
    },
    {
      name: "ACCIONES",
      allowOverflow: true,
      center: true,
      width: "10%",
      cell: (row) => {
        return (
          <div className="d-flex">
            <button className="dropdown-item">
              <Edit onClick={() => handleEditUsuario(row)} size={15} />
            </button>
            <button className="dropdown-item">
              <Trash onClick={() => handleDeleteUsuario(row)} size={15} />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="bg mt-5 pt-3">
      <div className="d-flex align-items-center">
        <h5 className="text-white p-4">PRODUCTOS</h5>
        <button
          onClick={() => {
            setProductEditar(null);
            setToggleProducto(true);
          }}
          className="btn btn-light"
        >
          +
        </button>
      </div>
      <div className="rounded mx-5">
        <DataTable
          columns={columnasProductos}
          data={products.datos}
          pagination
          selectableRows
        />
      </div>
      <div className="d-flex align-items-center">
        <h5 className="text-white p-4">BEBIDAS</h5>
        <button
          onClick={() => {
            setBebidaEditar(null);
            setToggleBebida(true);
          }}
          className="btn btn-light"
        >
          +
        </button>
      </div>
      <div className="rounded mx-5">
        <DataTable
          columns={columnasBebidas}
          data={bebidas.datos}
          pagination
          selectableRows
        />
      </div>

      <div className="d-flex align-items-center">
        <h5 className="text-white p-4">COMANDAS</h5>
        <button
          onClick={() => {
            setComandaEditar(null);
            setToggleComandas(true);
          }}
          className="btn btn-light"
        >
          +
        </button>
      </div>
      <div className="rounded mx-5 scrollAdmin">
        <DataTable
          columns={columnasComandas}
          data={comanda.datos}
          pagination
          selectableRows
        />
      </div>

      <div className="d-flex align-items-center">
        <h5 className="text-white p-4">USUARIOS</h5>
        <button
          onClick={() => {
            setUsuarioEditar(null);
            setToggleUsuarios(true);
          }}
          className="btn btn-light"
        >
          +
        </button>
      </div>
      <div className="rounded mx-5 scrollAdmin">
        <DataTable
          columns={columnasUsuarios}
          data={usuarios.datos}
          pagination
          selectableRows
        />
      </div>

      <ModalProductos
        show={toggleProducto}
        token={token}
        productEditar={productEditar}
        setRender={() => setRender(!render)}
        onHide={() => setToggleProducto(false)}
      />
      <ModalBebidas
        show={toggleBebida}
        token={token}
        bebidaEditar={bebidaEditar}
        setRender={() => setRender(!render)}
        onHide={() => setToggleBebida(false)}
      />
      <ModalComandas
        show={toggleComanda}
        comandaEditar={comandaEditar}
        setRender={() => setRender(!render)}
        onHide={() => setToggleComandas(false)}
      />
      <ModalUsuarios
        show={toggleUsuarios}
        usuarioEditar={usuarioEditar}
        setRender={() => setRender(!render)}
        onHide={() => setToggleUsuarios(false)}
      />
    </div>
  );
};
export default Administracion;
