import Sequelize from "sequelize";
import { db } from "../database/conexion.js";
import { Mascotas } from '../modelos/mascotaModelo.js'; // Asumiendo que el modelo Mascotas ya está definido
import { Clientes } from '../modelos/clienteModelo.js'; // Asumiendo que el modelo Adoptantes ya está definido

const SolicitudesAdopcion = db.define("solicitudes_adopcion", {
  id_solicitud: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  id_mascota: {
    type: Sequelize.INTEGER,
    references: {
      model: Mascotas,
      key: 'id_mascota'
    },
    allowNull: false,
  },
  id_cliente: {
    type: Sequelize.INTEGER,
    references: {
      model: Clientes,
      key: 'id_cliente'
    },
    allowNull: false,
  },
  fecha_solicitud: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  estado: {
    type: Sequelize.ENUM('Pendiente', 'Aprobada', 'Rechazada'),
    defaultValue: 'Pendiente',
    allowNull: false,
  },
  comentarios: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
});

export { SolicitudesAdopcion };
