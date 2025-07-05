import React, { useState, useEffect } from "react";

function Formulario() {
  const [datos, setDatos] = useState({
    nombre: "",
    edad: "",
    fecha: "",
    descripcion: "",
    categoria: "opcion1"
  });

  const [registros, setRegistros] = useState([]);


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
    setRegistros([...registros, datos]);
    setDatos({
      nombre: "",
      edad: "",
      fecha: "",
      descripcion: "",
      categoria: "opcion1"
    });
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

        <button type="submit">Enviar</button>
      </form>

      <h2>Registros guardados:</h2>
      <ul>
        {registros.map((item, index) => (
          <li key={index}>
            {item.nombre} - {item.edad} años - {item.fecha} - {item.categoria}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Formulario;
