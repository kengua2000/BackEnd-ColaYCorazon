import express from "express";
import { crearMascota, eliminarMascota, actualizarMascota, buscarIdMascota, buscarMascota,buscarMascotasPorFiltro } from "../controladores/mascotasController.js";

const routerMascotas = express.Router(); // Crear un router de Express

// Ruta raíz que envía un mensaje simple
routerMascotas.get('/', (req, res) => {
    res.send('Hola Sitio de Mascotas'); // Mensaje de prueba
});

// Ruta para crear una nueva mascota
routerMascotas.post('/crearMascota', (req, res) => {
    crearMascota(req, res); // Llama al controlador para crear una mascota
});

// Ruta para buscar todas las mascotas
routerMascotas.get('/buscarMascota', (req, res) => {
    buscarMascota(req, res); // Llama al controlador para buscar todas las mascotas
});

// Ruta para buscar mascotas usando un filtro en cualquier columna
routerMascotas.get('/buscarMascotaPorFiltro', (req, res) => {
    buscarMascotasPorFiltro(req, res); // Llama al controlador para buscar mascotas por filtro
});

// Ruta para buscar una mascota por ID
routerMascotas.get('/buscarIdMascota/:id', (req, res) => {
    buscarIdMascota(req, res); // Llama al controlador para buscar una mascota por su ID
});

// Ruta para actualizar una mascota
routerMascotas.put('/actualizarMascota/:id', (req, res) => {
    actualizarMascota(req, res); // Llama al controlador para actualizar una mascota por su ID
});

// Ruta para eliminar una mascota
routerMascotas.delete('/eliminarMascota/:id', (req, res) => {
    eliminarMascota(req, res); // Llama al controlador para eliminar una mascota por su ID
});

// Exportar el router para su uso en otras partes de la aplicación
export { routerMascotas };
