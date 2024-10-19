import React, { useState } from "react";
import axios from "axios";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState(null);

  // Función para hacer la solicitud con Axios
  const fetchReferido = () => {
    axios.get("/generate_nro_referido")
      .then((response) => setData(response.data)) // Guardamos los datos recibidos
      .catch((error) => console.error("Error al obtener datos:", error));
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
    if (!showPopup) {
      // Solo hacemos la solicitud cuando se abre el popup
      fetchReferido();
    }
  };

  return (
    <div className="App">
      <button onClick={togglePopup} className="bg-blue-500 text-white px-4 py-2 rounded">
        Mostrar Referido
      </button>

      {showPopup && data && (
        <div className="popup bg-white shadow-lg p-6 rounded-lg fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold">
              Hola {data.nombre}, aquí tienes tu link de referido:
            </h2>
            <p>
              <a
                href={`https://fesosa.com/Laia/${data.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                https://fesosa.com/Laia/{data.id}
              </a>
            </p>
            <button onClick={togglePopup} className="bg-red-500 text-white px-4 py-2 mt-4 rounded">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
