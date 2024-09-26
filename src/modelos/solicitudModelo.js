// Importar Sequelize y la conexión a la base de datos
import Sequelize from "sequelize";
import { db } from "../database/conexion.js"; // Importar la conexión a la base de datos
import { Mascotas } from '../modelos/mascotaModelo.js'; // Importar el modelo Mascotas
import { Clientes } from '../modelos/clienteModelo.js'; // Importar el modelo Clientes

// Definir el modelo "SolicitudesAdopcion", que corresponde a la tabla "solicitudes_adopcion" en la base de datos
const SolicitudesAdopcion = db.define("solicitudes_adopcion", {
  
  // Campo 'id_solicitud' - clave primaria, autoincremental
  id_solicitud: {
    type: Sequelize.INTEGER,       // Tipo entero
    autoIncrement: true,           // Incrementa automáticamente
    primaryKey: true,              // Es la clave primaria
    allowNull: false,              // No permite valores nulos
  },

  // Campo 'id_mascota' - referencia a la mascota solicitada
  id_mascota: {
    type: Sequelize.INTEGER,       // Tipo entero
    references: {                  // Definición de la relación
      model: Mascotas,             // Referencia al modelo Mascotas
      key: 'id_mascota'            // Clave foránea a la columna 'id_mascota' de la tabla Mascotas
    },
    allowNull: false,              // Este campo es obligatorio
  },

  // Campo 'id_cliente' - referencia al cliente que realiza la solicitud
  id_cliente: {
    type: Sequelize.INTEGER,       // Tipo entero
    references: {                  // Definición de la relación
      model: Clientes,             // Referencia al modelo Clientes
      key: 'id_cliente'            // Clave foránea a la columna 'id_cliente' de la tabla Clientes
    },
    allowNull: false,              // Este campo es obligatorio
  },

  // Campo 'fecha_solicitud' - fecha en que se realizó la solicitud de adopción
  fecha_solicitud: {
    type: Sequelize.DATE,          // Tipo de dato fecha
    allowNull: true,               // Este campo es opcional
  },

  // Campo 'estado' - estado de la solicitud de adopción
  estado: {
    type: Sequelize.ENUM('Pendiente', 'Aprobada', 'Rechazada'),  // Solo permite estos tres valores
    defaultValue: 'Pendiente',      // Valor por defecto es 'Pendiente'
    allowNull: false,               // No permite valores nulos
  },

  // Campo 'comentarios' - comentarios adicionales sobre la solicitud de adopción
  comentarios: {
    type: Sequelize.TEXT,           // Texto libre para comentarios
    allowNull: true,                // Este campo es opcional
  },
});

// Exportar el modelo "SolicitudesAdopcion" para usarlo en otras partes de la aplicación
export { SolicitudesAdopcion };
