import React, { useState } from "react";

const AdministradorAdd = ({ onAdd }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoAdministrador = { nombre, apellido, email, telefono };
    onAdd(nuevoAdministrador);
    setNombre("");
    setApellido("");
    setEmail("");
    setTelefono("");
  };

  return (
    <div style={{ backgroundColor: 'lightblue', padding: 225,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
     }}>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <br/>
      <div>
        <label>Apellido:</label>
        <input
          type="text"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
      </div>
      <br/>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <br/>
      <div>
        <label>Teléfono:</label>
        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
      </div>
      <br/>
      <button type="submit">Agregar Administrador</button>
    </form>
    </div>
  );
};

export default AdministradorAdd;
