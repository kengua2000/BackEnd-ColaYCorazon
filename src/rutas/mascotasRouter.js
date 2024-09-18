import express from "express";
import {crearMascota,eliminarMascota,actualizarMascota,buscarIdMascota,buscarMascota} from "../controladores/mascotasController.js";

const routerMascotas = express.Router();

routerMascotas.get('/', (req, res) => {
    res.send('Hola Sitio de Mascotas');
});

routerMascotas.post('/crearMascota', (req, res) => {
    //res.send('Crear Mascota');
    crearMascota(req,res);
    
});

routerMascotas.get('/buscarMascota', (req, res) => {
    //res.send('Buscar Mascota');
    buscarMascota(req,res);
});

routerMascotas.get('/buscarIdMascota/:id', (req, res) => {
    //res.send('Buscar Mascota');
    buscarIdMascota(req,res);
});

routerMascotas.put('/actualizarMascota/:id', (req, res) => {
    //res.send('Actualizar Mascota');
    actualizarMascota(req,res);
});

routerMascotas.delete('/eliminarMascota/:id', (req, res) => {
    eliminarMascota(req,res);
});




export {routerMascotas}