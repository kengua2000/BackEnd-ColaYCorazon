import Sequelize from "sequelize";

// Crear una nueva instancia de Sequelize
const db = new Sequelize("colaycorazon", "mascotas", "1234", {
    dialect: "mysql", // Especifica que se utilizará MySQL
    host: "localhost" // Dirección del servidor de la base de datos
});

// Exportar la instancia de la base de datos para su uso en otros archivos
export { db };
