//SWAGGER
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");


//CONEXION MONGODB------------------------------------------------------------------

// Importar mongoose
const mongoose = require("mongoose");

// Conectar con MongoDB
mongoose.connect("mongodb://localhost:27017/concesionariosDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Definir un esquema de mongoose para los concesionarios
const concesionarioSchema = new mongoose.Schema({
    nombre: String,
    direccion: String,
    coches: [{ modelo: String, cv: Number, precio: Number }],
});

// Crear un modelo a partir del esquema
const Concesionario = mongoose.model("Concesionario", concesionarioSchema);

//CONEXION MONGODB------------------------------------------------------------------

/**
 * Tres formas de almacenar valores en memoria en javascript:
 *      let: se puede modificar
 *      var: se puede modificar
 *      const: es constante y no se puede modificar
 */

// Importamos las bibliotecas necesarias.
// Concretamente el framework express.

const express = require("express");

// Inicializamos la aplicación
const app = express();


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));



// Indicamos que la aplicación puede recibir JSON (API Rest)
app.use(express.json());

// Indicamos el puerto en el que vamos a desplegar la aplicación
const port = process.env.PORT || 8080;

// Arrancamos la aplicación
app.listen(port, () => {
    console.log(`Servidor desplegado en puerto: ${port}`);
});


// Definimos una estructura de datos
// (temporal hasta incorporar una base de datos)
let concesionarios = [
    { nombre: "Concesionario1", direccion: "Dirección1", coches: [{ modelo: "Corsa", cv: 100, precio: 15000 }] },
];

// Obtener todos los concesionarios
app.get("/concesionarios", (request, response) => {
    response.json(concesionarios);
});

// Crear un nuevo concesionario
app.post("/concesionarios", (request, response) => {
    const nuevoConcesionario = request.body;
    concesionarios.push(nuevoConcesionario);
    response.json({ message: "Concesionario creado correctamente" });
});

// Obtener un solo concesionario
app.get("/concesionarios/:id", (request, response) => {
    const id = request.params.id;
    const concesionario = concesionarios[id];
    response.json({ concesionario });
});

// Actualizar un solo concesionario
app.put("/concesionarios/:id", (request, response) => {
    const id = request.params.id;
    concesionarios[id] = request.body;
    response.json({ message: "Concesionario actualizado correctamente" });
});

// Borrar un concesionario
app.delete("/concesionarios/:id", (request, response) => {
    const id = request.params.id;
    concesionarios.splice(id, 1);
    response.json({ message: "Concesionario eliminado correctamente" });
});

// Obtener todos los coches de un concesionario
app.get("/concesionarios/:id/coches", (request, response) => {
    const id = request.params.id;
    const cochesDelConcesionario = concesionarios[id].coches;
    response.json(cochesDelConcesionario);
});

// Añadir un nuevo coche a un concesionario
app.post("/concesionarios/:id/coches", (request, response) => {
    const id = request.params.id;
    const nuevoCoche = request.body;
    concesionarios[id].coches.push(nuevoCoche);
    response.json({ message: "Coche añadido al concesionario correctamente" });
});

// Obtener un solo coche de un concesionario
app.get("/concesionarios/:id/coches/:cocheId", (request, response) => {
    const id = request.params.id;
    const cocheId = request.params.cocheId;
    const coche = concesionarios[id].coches.find((c) => c.id === cocheId);
    response.json({ coche });
});

// Actualizar un solo coche de un concesionario
app.put("/concesionarios/:id/coches/:cocheId", (request, response) => {
    const id = request.params.id;
    const cocheId = request.params.cocheId;
    const indice = concesionarios[id].coches.findIndex((c) => c.id === cocheId);
    concesionarios[id].coches[indice] = request.body;
    response.json({ message: "Coche actualizado correctamente" });
});

// Borrar un coche de un concesionario
app.delete("/concesionarios/:id/coches/:cocheId", (request, response) => {
    const id = request.params.id;
    const cocheId = request.params.cocheId;
    const indice = concesionarios[id].coches.findIndex((c) => c.id === cocheId);
    concesionarios[id].coches.splice(indice, 1);
    response.json({ message: "Coche eliminado correctamente" });
});
