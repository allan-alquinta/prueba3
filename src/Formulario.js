import React, { useState, useEffect } from "react";

function Formulario() {
  const [datos, setDatos] = useState({
    nombre: "",
    edad: "",
    fecha: "",
    descripcion: "",
    categoria: "opcion1",
  });

  const [registros, setRegistros] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [indiceEditar, setIndiceEditar] = useState(null);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const datosGuardados = localStorage.getItem("registros");
    if (datosGuardados) {
      setRegistros(JSON.parse(datosGuardados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("registros", JSON.stringify(registros));
  }, [registros]);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nombreDuplicado = registros.some(
      (item, idx) =>
        item.nombre.toLowerCase() === datos.nombre.toLowerCase() &&
        (!modoEdicion || idx !== indiceEditar)
    );

    if (nombreDuplicado) {
      setMensaje("ya existe un registro con ese nombre.");
      return;
    }

    if (modoEdicion) {
      const nuevos = [...registros];
      nuevos[indiceEditar] = datos;
      setRegistros(nuevos);
      setMensaje("registro actualizado correctamente.");
      setModoEdicion(false);
      setIndiceEditar(null);
    } else {
      setRegistros([...registros, datos]);
      setMensaje("registro creado correctamente.");
    }

    setDatos({
      nombre: "",
      edad: "",
      fecha: "",
      descripcion: "",
      categoria: "opcion1",
    });

    setTimeout(() => {
      setMensaje("");
    }, 3000);
  };

  const handleEditar = (index) => {
    setDatos(registros[index]);
    setModoEdicion(true);
    setIndiceEditar(index);
  };

  const handleEliminar = (index) => {
    const nuevos = registros.filter((_, i) => i !== index);
    setRegistros(nuevos);
    if (indiceEditar === index) {
      setModoEdicion(false);
      setIndiceEditar(null);
      setDatos({
        nombre: "",
        edad: "",
        fecha: "",
        descripcion: "",
        categoria: "opcion1",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={datos.nombre}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Edad:
          <input
            type="number"
            name="edad"
            value={datos.edad}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Fecha:
          <input
            type="date"
            name="fecha"
            value={datos.fecha}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Descripción:
          <textarea
            name="descripcion"
            value={datos.descripcion}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Categoría:
          <select
            name="categoria"
            value={datos.categoria}
            onChange={handleChange}
            required
          >
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
          </select>
        </label>
        <br />

        <button type="submit">{modoEdicion ? "actualizar" : "enviar"}</button>
        {mensaje && <p>{mensaje}</p>}
      </form>

      <h2>Registros guardados:</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Fecha</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((item, index) => (
            <tr key={index}>
              <td>{item.nombre}</td>
              <td>{item.edad}</td>
              <td>{item.fecha}</td>
              <td>{item.categoria}</td>
              <td>{item.descripcion}</td>
              <td>
                <button onClick={() => handleEditar(index)}>Editar</button>
                <button onClick={() => handleEliminar(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Formulario;
