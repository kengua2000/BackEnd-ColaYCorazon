import express from "express";
import {  crearSolicitudAdopcion,  eliminarSolicitudAdopcion,  actualizarSolicitudAdopcion, buscarIdSolicitudAdopcion, buscarSolicitudesAdopcion } from "../controladores/solicitudesController.js";

const routerSolicitudes = express.Router(); // Crear un router de Express

// Ruta raíz que envía un mensaje simple
routerSolicitudes.get('/', (req, res) => {
    res.send('Hola Sitio de Solicitudes de Adopción'); // Mensaje de prueba
});

// Ruta para crear una nueva solicitud de adopción
routerSolicitudes.post('/crearSolicitudAdopcion', (req, res) => {
    crearSolicitudAdopcion(req, res); // Llama al controlador para crear una solicitud
});

// Ruta para buscar todas las solicitudes de adopción
routerSolicitudes.get('/buscarSolicitudesAdopcion', (req, res) => {
    buscarSolicitudesAdopcion(req, res); // Llama al controlador para buscar todas las solicitudes
});

// Ruta para buscar una solicitud de adopción por ID
routerSolicitudes.get('/buscarIdSolicitudAdopcion/:id', (req, res) => {
    buscarIdSolicitudAdopcion(req, res); // Llama al controlador para buscar una solicitud por su ID
});

// Ruta para actualizar una solicitud de adopción
routerSolicitudes.put('/actualizarSolicitudAdopcion/:id', (req, res) => {
    actualizarSolicitudAdopcion(req, res); // Llama al controlador para actualizar una solicitud por su ID
});

// Ruta para eliminar una solicitud de adopción
routerSolicitudes.delete('/eliminarSolicitudAdopcion/:id', (req, res) => {
    eliminarSolicitudAdopcion(req, res); // Llama al controlador para eliminar una solicitud por su ID
});

// Exportar el router para su uso en otras partes de la aplicación
export { routerSolicitudes };
