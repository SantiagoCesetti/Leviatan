import React, { useState } from "react";

const PersonalLimpiezaAdd = ({ onAdd }) => {
  const [ordenado, setOrdenado] = useState(false);
  const [barrido, setBarrido] = useState(false);
  const [trapeado, setTrapeado] = useState(false);
  const [desinfectado, setDesinfectado] = useState(false);
  const [observaciones, setObservaciones] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoPersonalLimpieza = { 
      ordenado, 
      barrido, 
      trapeado, 
      desinfectado, 
      observaciones 
    };
    onAdd(nuevoPersonalLimpieza);
    setOrdenado(false);
    setBarrido(false);
    setTrapeado(false);
    setDesinfectado(false);
    setObservaciones("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          <input
            type="checkbox"
            checked={ordenado}
            onChange={(e) => setOrdenado(e.target.checked)}
          />
          Ordenado
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={barrido}
            onChange={(e) => setBarrido(e.target.checked)}
          />
          Barrido
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={trapeado}
            onChange={(e) => setTrapeado(e.target.checked)}
          />
          Trapeado
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={desinfectado}
            onChange={(e) => setDesinfectado(e.target.checked)}
          />
          Desinfectado
        </label>
      </div>
      <div>
        <label>Observaciones:</label>
        <textarea
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
        />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default PersonalLimpiezaAdd;
