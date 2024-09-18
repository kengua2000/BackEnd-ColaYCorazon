import Sequelize from "sequelize";
import { db } from "../database/conexion.js";

const Mascotas = db.define("mascotas", {
  id_mascota: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  nombre: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  especie: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  raza: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },
  edad: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  sexo: {
    type: Sequelize.ENUM('Macho', 'Hembra'),
    allowNull: true,
  },
  peso: {
    type: Sequelize.DECIMAL(5, 2),
    allowNull: true,
  },
  descripcion: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  estado: {
    type: Sequelize.ENUM('Disponible', 'Adoptada'),
    defaultValue: 'Disponible',
    allowNull: false,
  },
  fecha_ingreso: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  foto_url: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
});

export { Mascotas };
