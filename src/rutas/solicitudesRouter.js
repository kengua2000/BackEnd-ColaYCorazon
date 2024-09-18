import express from "express";
import { 
    crearSolicitudAdopcion, 
    eliminarSolicitudAdopcion, 
    actualizarSolicitudAdopcion, 
    buscarIdSolicitudAdopcion, 
    buscarSolicitudesAdopcion 
} from "../controladores/solicitudesController.js";

const routerSolicitudes = express.Router();

routerSolicitudes.get('/', (req, res) => {
    res.send('Hola Sitio de Solicitudes de Adopción');
});

routerSolicitudes.post('/crearSolicitudAdopcion', (req, res) => {
    crearSolicitudAdopcion(req, res);
});

routerSolicitudes.get('/buscarSolicitudesAdopcion', (req, res) => {
    buscarSolicitudesAdopcion(req, res);
});

routerSolicitudes.get('/buscarIdSolicitudAdopcion/:id', (req, res) => {
    buscarIdSolicitudAdopcion(req, res);
});

routerSolicitudes.put('/actualizarSolicitudAdopcion/:id', (req, res) => {
    actualizarSolicitudAdopcion(req, res);
});

routerSolicitudes.delete('/eliminarSolicitudAdopcion/:id', (req, res) => {
    eliminarSolicitudAdopcion(req, res);
});

export {routerSolicitudes} ;
