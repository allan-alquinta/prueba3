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

  // Leer registros al cargar
  useEffect(() => {
    const datosGuardados = localStorage.getItem("registros");
    if (datosGuardados) {
      setRegistros(JSON.parse(datosGuardados));
    }
  }, []);

  // Guardar registros al cambiar
  useEffect(() => {
    localStorage.setItem("registros", JSON.stringify(registros));
  }, [registros]);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modoEdicion) {
      const nuevos = [...registros];
      nuevos[indiceEditar] = datos;
      setRegistros(nuevos);
      setModoEdicion(false);
      setIndiceEditar(null);
    } else {
      setRegistros([...registros, datos]);
    }

    setDatos({
      nombre: "",
      edad: "",
      fecha: "",
      descripcion: "",
      categoria: "opcion1",
    });
  };

  const handleEditar = (index) => {
    setDatos(registros[index]);
    setModoEdicion(true);
    setIndiceEditar(index);
  };

  const handleEliminar = (index) => {
    const nuevos = registros.filter((_, i) => i !== index);
    setRegistros(nuevos);
    // Si estabas editando el eliminado, resetea
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

        <button type="submit">{modoEdicion ? "Actualizar" : "Enviar"}</button>
      </form>

      <h2>Registros guardados:</h2>
      <ul>
        {registros.map((item, index) => (
          <li key={index}>
            {item.nombre} - {item.edad} años - {item.fecha} - {item.categoria}
            <button onClick={() => handleEditar(index)}>Editar</button>
            <button onClick={() => handleEliminar(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Formulario;
