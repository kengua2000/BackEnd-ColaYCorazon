import express from "express";
import { db } from "./database/conexion.js";
import { routerMascotas } from "./rutas/mascotasRouter.js";
import { routerClientes } from "./rutas/clientesRouter.js";
import { routerSolicitudes } from "./rutas/solicitudesRouter.js";

//Crear instancia de Express
const app = express();

//Middleware JSON
app.use(express.json());

//Verificar Conexion Base Datos
db.authenticate().then(()=>{
    console.log(`Conexion a Base de datos correcta`);
}).catch(err=>{
    console.log(`Conexion a Base de datos incorrecta ${err}`);
});

app.get('/', (req, res) => {
    res.send('Hola Sitio Principal');
});

//Llamar rutas de mascotas
app.use("/mascotas",routerMascotas);
app.use("/clientes",routerClientes);
app.use("/solicitudes", routerSolicitudes);


const PORT=4000;

db.sync({force: true}).then(()=>{
    //Abri servicio e iniciar el Servidor
    app.listen(PORT,()=>{
        console.log(`Servidor Inicializado en el puerto ${PORT}`);
    })

}).catch(err=>{
    console.log(`Error al Sincronizar base de datos ${err}`);
});

