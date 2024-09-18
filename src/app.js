import express from "express";
import { db } from "./database/conexion.js";

//Crear instancia de Express
const app = express();

//Verificar Conexion Base Datos
db.authenticate().then(()=>{
    console.log(`Conexion a Base de datos correcta`);
}).catch(err=>{
    console.log(`Conexion a Base de datos incorrecta ${err}`);
});

app.get('/', (req, res) => {
    res.send('Sitio Principal Cola y Corazón');
});


const PORT=4000;

db.sync({force: false}).then(()=>{
    //Abri servicio e iniciar el Servidor
    app.listen(PORT,()=>{
        console.log(`Servidor Inicializado en el puerto ${PORT}`);
    })

}).catch(err=>{
    console.log(`Error al Sincronizar base de datos ${err}`);
});

