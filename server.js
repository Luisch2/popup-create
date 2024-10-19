const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;//Servidor 3000

const generateReferidoID = () => {
  return Math.floor(10000 + Math.random() * 90000); 
};

app.get('/generate_nro_referido', (req, res) => {
  // Leer el archivo JSON
  fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error leyendo el archivo JSON' });
    }

    const jsonData = JSON.parse(data);
    
    jsonData.id = generateReferidoID();

    
    res.json(jsonData);
  });
});

// Servir la aplicación React desde el build
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
