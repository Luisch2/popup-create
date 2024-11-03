import React, { useEffect, useState } from "react";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [personajes, setPersonajes] = useState(null); // Inicializa en null para manejar el objeto completo

  useEffect(() => {
    async function fetchPersonaje() {
      try {
        const response = await fetch("http://localhost:3000/generate_nro_referido/update_code");
        const data = await response.json();
        setPersonajes(data); // Asigna el objeto completo directamente
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    }

    if (showPopup) {
      fetchPersonaje();
    }
  }, [showPopup]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <button onClick={togglePopup} className="bg-blue-500 text-white px-4 py-2 rounded">
        Mostrar Personaje
      </button>

      {showPopup && personajes && (
        <div className="popup bg-white shadow-lg p-6 rounded-lg fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Hola, {personajes.name}, tu número de referido es:</h2>
            <p>
              <a
                href={`https://fesosa.com/Laia/${personajes.refer_code}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                https://fesosa.com/Laia/{personajes.refer_code}
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
