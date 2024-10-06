import express from "express";
import { crearCliente, eliminarCliente, actualizarCliente, buscarIdCliente, buscarClientes, buscarClientesPorFiltro } from "../controladores/clientesController.js"; // Importar el controlador con la nueva función

const routerClientes = express.Router(); // Crear un router de Express

// Ruta raíz que envía un mensaje simple
routerClientes.get('/', (req, res) => {
    res.send('Hola Sitio de Clientes');
});

// Ruta para crear un cliente
routerClientes.post('/crearCliente', (req, res) => {
    crearCliente(req, res); // Llama al controlador para crear un cliente
});

// Ruta para buscar todos los clientes
routerClientes.get('/buscarCliente', (req, res) => {
    buscarClientes(req, res); // Llama al controlador para buscar todos los clientes
});

// Ruta para buscar un cliente por su ID
routerClientes.get('/buscarIdCliente/:id', (req, res) => {
    buscarIdCliente(req, res); // Llama al controlador para buscar un cliente por su ID
});

// Ruta para buscar clientes usando un filtro en cualquier columna
routerClientes.get('/buscarClientePorFiltro', (req, res) => {
    buscarClientesPorFiltro(req, res); // Llama al controlador para buscar clientes por filtro
});

// Ruta para actualizar un cliente
routerClientes.put('/actualizarCliente/:id', (req, res) => {
    actualizarCliente(req, res); // Llama al controlador para actualizar un cliente por su ID
});

// Ruta para eliminar un cliente
routerClientes.delete('/eliminarCliente/:id', (req, res) => {
    eliminarCliente(req, res); // Llama al controlador para eliminar un cliente por su ID
});

export { routerClientes }; // Exporta el router para su uso en otras partes de la aplicación
