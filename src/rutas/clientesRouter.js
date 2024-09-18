import express from "express";
import { crearCliente, eliminarCliente, actualizarCliente, buscarIdCliente, buscarClientes } from "../controladores/clientesController.js";

const routerClientes = express.Router();

routerClientes.get('/', (req, res) => {
    res.send('Hola Sitio de Clientes');
});

routerClientes.post('/crearCliente', (req, res) => {
    crearCliente(req, res);
});

routerClientes.get('/buscarCliente', (req, res) => {
    buscarClientes(req, res);
});

routerClientes.get('/buscarIdCliente/:id', (req, res) => {
    buscarIdCliente(req, res);
});

routerClientes.put('/actualizarCliente/:id', (req, res) => {
    actualizarCliente(req, res);
});

routerClientes.delete('/eliminarCliente/:id', (req, res) => {
    eliminarCliente(req, res);
});

export {routerClientes} ;
