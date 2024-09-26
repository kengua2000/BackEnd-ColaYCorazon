// Importar Sequelize y la conexión a la base de datos
import Sequelize from "sequelize";
import { db } from "../database/conexion.js"; // Importar la conexión a la base de datos

// Definir el modelo "Clientes", que corresponde a la tabla "clientes" en la base de datos
const Clientes = db.define("clientes", {
  // Campo 'id_cliente' - clave primaria, autoincremental
  id_cliente: {
    type: Sequelize.INTEGER,       // Tipo entero
    autoIncrement: true,           // Incrementa automáticamente
    primaryKey: true,              // Es la clave primaria
    allowNull: false,              // No permite valores nulos
  },

  // Campo 'nombre' - nombre del cliente
  nombre: {
    type: Sequelize.STRING(100),   // Cadena de hasta 100 caracteres
    allowNull: false,              // Este campo es obligatorio
  },

  // Campo 'apellido' - apellido del cliente
  apellido: {
    type: Sequelize.STRING(100),   // Cadena de hasta 100 caracteres
    allowNull: false,              // Este campo es obligatorio
  },

  // Campo 'direccion' - dirección del cliente
  direccion: {
    type: Sequelize.STRING(255),   // Cadena de hasta 255 caracteres
    allowNull: true,               // Este campo es opcional
  },

  // Campo 'telefono' - número de teléfono del cliente
  telefono: {
    type: Sequelize.STRING(20),    // Cadena de hasta 20 caracteres
    allowNull: true,               // Este campo es opcional
  },

  // Campo 'email' - dirección de correo electrónico del cliente
  email: {
    type: Sequelize.STRING(100),   // Cadena de hasta 100 caracteres
    allowNull: true,               // Este campo es opcional
  },

  // Campo 'fecha_registro' - fecha en que se registró el cliente
  fecha_registro: {
    type: Sequelize.DATE,          // Tipo de dato fecha
    allowNull: true,               // Este campo es opcional
  },
});

// Exportar el modelo "Clientes" para su uso en otras partes de la aplicación
export { Clientes };
