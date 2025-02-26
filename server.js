const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4200;

// Servir archivos estáticos desde "dist"
app.use(express.static(path.join(__dirname, "dist/clfacturacion")));

// Manejar todas las rutas con el index.html de Angular
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/clfacturacion/index.html"));
});

// Iniciar el servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});
