// Importar el framework Express y los módulos de la base de datos y rutas
import express from "express";
import { db } from "./database/conexion.js"; // Conexión a la base de datos
import { routerMascotas } from "./rutas/mascotasRouter.js"; // Rutas para gestionar mascotas
import { routerClientes } from "./rutas/clientesRouter.js"; // Rutas para gestionar clientes
import { routerSolicitudes } from "./rutas/solicitudesRouter.js"; // Rutas para gestionar solicitudes
import cors from "cors";

// Crear instancia de la aplicación Express
const app = express();
app.use(cors());

// Middleware para procesar datos en formato JSON
app.use(express.json());

// Verificar la conexión a la base de datos
// db.authenticate() retorna una promesa que verifica si la base de datos está conectada correctamente
db.authenticate().then(() => {
    console.log(`Conexión a la base de datos correcta`);
}).catch(err => {
    console.log(`Error en la conexión a la base de datos: ${err}`);
});

// Definir la ruta raíz para la página principal
// Esta ruta envía un mensaje de bienvenida cuando el cliente accede a la raíz del servidor
app.get('/', (req, res) => {
    res.send('Hola, Bienvenidos a la Fundación Cola y Corazón');
});

// Definir las rutas principales de la aplicación, utilizando routers modulares
// Rutas específicas para cada conjunto de datos (mascotas, clientes, solicitudes)
app.use("/mascotas", routerMascotas); // Rutas relacionadas con mascotas
app.use("/clientes", routerClientes); // Rutas relacionadas con clientes
app.use("/solicitudes", routerSolicitudes); // Rutas relacionadas con solicitudes de adopción

// Definir el puerto en el que el servidor escuchará peticiones
const PORT = 4000;

// Sincronizar los modelos con la base de datos sin forzar cambios destructivos (force: false)
// db.sync() asegura que la base de datos esté alineada con los modelos definidos en la aplicación
db.sync({ force: false}).then(() => {
    // Si la sincronización es exitosa, iniciar el servidor en el puerto definido
    app.listen(PORT, () => {
        console.log(`Servidor iniciado en el puerto ${PORT}`);
    });
}).catch(err => {
    // Capturar cualquier error durante la sincronización de la base de datos
    console.log(`Error al sincronizar la base de datos: ${err}`);
});
