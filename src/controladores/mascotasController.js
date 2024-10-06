import { Mascotas } from "../modelos/mascotaModelo.js"; // Importar el modelo Mascotas
import { Op } from "sequelize"; // Importar operadores de Sequelize para realizar consultas avanzadas

// Buscar Mascotas por filtro en cualquier columna
const buscarMascotasPorFiltro = (req, res) => {
    const filtro = req.query.filtro; // Obtener el parámetro de búsqueda desde la query string

    if (!filtro) {
        res.status(400).json({
            mensaje: "El filtro de búsqueda no puede estar vacío"
        });
        return;
    }

    // Crear condiciones de búsqueda para aplicar el filtro en múltiples columnas
    const condicionesBusqueda = {
        [Op.or]: [
            { nombre: { [Op.like]: `%${filtro}%` } },
            { especie: { [Op.like]: `%${filtro}%` } },
            { raza: { [Op.like]: `%${filtro}%` } },
            { sexo: { [Op.like]: `%${filtro}%` } },
            { descripcion: { [Op.like]: `%${filtro}%` } }
        ]
    };

    // Usar Sequelize para buscar mascotas que coincidan con el filtro en cualquier columna
    Mascotas.findAll({ where: condicionesBusqueda })
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado); // Devolver los registros encontrados
            } else {
                res.status(404).json({
                    mensaje: "No se encontraron mascotas con el filtro proporcionado"
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `Error al buscar mascotas ::: ${err}`
            });
        });
};


// Crear un recurso Mascota
const crearMascota = (req, res) => {

    // Validar campos obligatorios
    if (!req.body.nombre) {
        res.status(400).send({
            mensaje: "El nombre no puede estar vacío."
        });
        return;
    }

    if (!req.body.especie) {
        res.status(400).send({
            mensaje: "La especie no puede estar vacía."
        });
        return;
    }

    // Crear dataset con los datos recibidos del cuerpo de la solicitud
    const dataset = {
        nombre: req.body.nombre,
        especie: req.body.especie,
        raza: req.body.raza || null,
        edad: req.body.edad || null,
        sexo: req.body.sexo || null,
        peso: req.body.peso || null,
        descripcion: req.body.descripcion || null,
        estado: req.body.estado || 'Disponible', // Estado por defecto: Disponible
        fecha_ingreso: req.body.fecha_ingreso || new Date(), // Fecha actual por defecto
        foto_url: req.body.foto_url || null
    };

    // Usar Sequelize para crear el recurso en la base de datos
    Mascotas.create(dataset).then((resultado) => {
        res.status(200).json({
            mensaje: "Registro de Mascota Creado con Éxito",
            data: resultado
        });
    }).catch((err) => {
        res.status(500).json({
            mensaje: `Registro de Mascota No creado ::: ${err}`
        });
    });
};

// Buscar todas las Mascotas
const buscarMascota = (req, res) => {
    Mascotas.findAll()
        .then((resultado) => {
            res.status(200).json(resultado); // Devolver los resultados en formato JSON
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `No se encontraron registros ::: ${err}`
            });
        });
}

// Buscar Mascota por ID
const buscarIdMascota = (req, res) => {
    const id = req.params.id; // Obtener ID de los parámetros de la URL
    if (!id) {
        res.status(400).json({
            mensaje: "El ID no puede estar vacío"
        });
        return;
    }

    // Buscar Mascota por clave primaria (ID)
    Mascotas.findByPk(id)
        .then((resultado) => {
            if (resultado) {
                res.status(200).json(resultado); // Devolver la mascota si se encuentra
            } else {
                res.status(404).json({
                    mensaje: "Mascota no encontrada"
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `Error al buscar mascota ::: ${err}`
            });
        });
}

// Actualizar Mascota
const actualizarMascota = (req, res) => {
    const id = req.params.id; // Obtener ID de los parámetros de la URL
    if (!id) {
        res.status(400).json({
            mensaje: "El ID no puede estar vacío"
        });
        return;
    }

    // Dataset de actualización, usando los valores recibidos del cuerpo de la solicitud
    const datosActualizar = {
        nombre: req.body.nombre || undefined,
        especie: req.body.especie || undefined,
        raza: req.body.raza || undefined,
        edad: req.body.edad || undefined,
        sexo: req.body.sexo || undefined,
        peso: req.body.peso || undefined,
        descripcion: req.body.descripcion || undefined,
        estado: req.body.estado || undefined,
        fecha_ingreso: req.body.fecha_ingreso || undefined,
        foto_url: req.body.foto_url || undefined
    };

    // Eliminar los campos vacíos o indefinidos
    Object.keys(datosActualizar).forEach(key => {
        if (datosActualizar[key] === undefined) {
            delete datosActualizar[key];
        }
    });

    // Si no hay datos para actualizar, devolver un error
    if (Object.keys(datosActualizar).length === 0) {
        res.status(400).json({
            mensaje: "No se proporcionaron datos para actualizar"
        });
        return;
    }

    // Actualizar la Mascota con Sequelize
    Mascotas.update(datosActualizar, { where: { id_mascota: id } })
        .then((resultado) => {
            if (resultado[0] === 1) { // Comprobar si se actualizó el registro
                res.status(200).json({
                    tipo: 'success',
                    mensaje: "Registro actualizado con éxito"
                });
            } else {
                res.status(404).json({
                    tipo: 'error',
                    mensaje: "Mascota no encontrada o sin cambios"
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                tipo: 'error',
                mensaje: `Error al actualizar registro ::: ${err}`
            });
        });
}

// Eliminar Mascota
const eliminarMascota = (req, res) => {
    const id = req.params.id; // Obtener ID de los parámetros de la URL
    if (!id) {
        res.status(400).json({
            mensaje: "El ID no puede estar vacío"
        });
        return;
    }

    // Eliminar la mascota con Sequelize
    Mascotas.destroy({ where: { id_mascota: id } })
        .then((resultado) => {
            if (resultado === 1) { // Comprobar si se eliminó el registro
                res.status(200).json({
                    tipo: 'success',
                    mensaje: "Registro eliminado con éxito"
                });
            } else {
                res.status(404).json({
                    tipo: 'error',
                    mensaje: "Mascota no encontrada"
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                tipo: 'error',
                mensaje: `Error al eliminar registro ::: ${err}`
            });
        });
}

// Exportar las funciones para su uso en las rutas
export { crearMascota, eliminarMascota, actualizarMascota, buscarIdMascota, buscarMascota,buscarMascotasPorFiltro }
