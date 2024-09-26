// Importar Sequelize y la conexión a la base de datos
import Sequelize from "sequelize";
import { db } from "../database/conexion.js"; // Importa la conexión a la base de datos

// Definir el modelo "Mascotas", que corresponde a la tabla "mascotas" en la base de datos
const Mascotas = db.define("mascotas", {
  // Campo 'id_mascota' - clave primaria, autoincremental
  id_mascota: {
    type: Sequelize.INTEGER,       // Tipo entero
    autoIncrement: true,           // Incrementa automáticamente el valor
    primaryKey: true,              // Es la clave primaria
    allowNull: false,              // No se permite valor nulo
  },
  
  // Campo 'nombre' - nombre de la mascota
  nombre: {
    type: Sequelize.STRING(50),    // Cadena de caracteres de longitud máxima 50
    allowNull: false,              // Este campo es obligatorio
  },
  
  // Campo 'especie' - especie de la mascota (perro, gato, etc.)
  especie: {
    type: Sequelize.STRING(50),    // Cadena de longitud máxima 50
    allowNull: false,              // Este campo es obligatorio
  },
  
  // Campo 'raza' - raza de la mascota, es opcional
  raza: {
    type: Sequelize.STRING(50),    // Cadena de longitud máxima 50
    allowNull: true,               // Este campo es opcional
  },
  
  // Campo 'edad' - edad de la mascota en años
  edad: {
    type: Sequelize.INTEGER,       // Tipo entero, representa la edad de la mascota
    allowNull: true,               // Este campo es opcional
  },
  
  // Campo 'sexo' - sexo de la mascota (Macho o Hembra)
  sexo: {
    type: Sequelize.ENUM('Macho', 'Hembra'),  // Solo permite valores 'Macho' o 'Hembra'
    allowNull: true,                          // Este campo es opcional
  },
  
  // Campo 'peso' - peso de la mascota en kg con hasta dos decimales
  peso: {
    type: Sequelize.DECIMAL(5, 2),  // Número decimal con 5 dígitos totales y 2 decimales (por ejemplo: 12.34 kg)
    allowNull: true,                // Este campo es opcional
  },
  
  // Campo 'descripcion' - descripción de la mascota
  descripcion: {
    type: Sequelize.TEXT,           // Texto largo para una descripción detallada
    allowNull: true,                // Este campo es opcional
  },
  
  // Campo 'estado' - indica si la mascota está disponible para adopción o ya ha sido adoptada
  estado: {
    type: Sequelize.ENUM('Disponible', 'Adoptada'),  // Solo permite 'Disponible' o 'Adoptada'
    defaultValue: 'Disponible',                      // Valor por defecto es 'Disponible'
    allowNull: false,                                // No se permite valor nulo
  },
  
  // Campo 'fecha_ingreso' - fecha de ingreso de la mascota a la fundación
  fecha_ingreso: {
    type: Sequelize.DATE,          // Tipo de dato fecha
    allowNull: true,               // Este campo es opcional
  },
  
  // Campo 'foto_url' - URL de la foto de la mascota
  foto_url: {
    type: Sequelize.STRING(255),   // Cadena de caracteres para almacenar la URL, longitud máxima de 255
    allowNull: true,               // Este campo es opcional
  },
});

// Exportar el modelo "Mascotas" para usarlo en otras partes de la aplicación
export { Mascotas };
