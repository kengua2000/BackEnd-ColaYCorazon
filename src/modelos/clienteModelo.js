import Sequelize from "sequelize";
import { db } from "../database/conexion.js";

const Clientes = db.define("clientes", {
  id_cliente: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  nombre: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  apellido: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  direccion: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  telefono: {
    type: Sequelize.STRING(20),
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  fecha_registro: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

export { Clientes };
