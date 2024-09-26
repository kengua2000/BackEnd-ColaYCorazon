import { SolicitudesAdopcion  } from "../modelos/solicitudModelo.js"; // Importar el modelo de las solicitudes de adopción

// Crear una nueva solicitud de adopción
const crearSolicitudAdopcion = (req, res) => {
    console.log("Solicitud de adopción recibida", req.body); // Registro de la solicitud recibida

    // Validar que los campos obligatorios existan
    if (!req.body.id_mascota || !req.body.id_cliente) {
        res.status(400).send({
            mensaje: "La ID de la mascota y la ID del adoptante son obligatorias."
        });
        return;
    }

    // Crear dataset con los datos recibidos del cuerpo de la solicitud
    const dataset = {
        id_mascota: req.body.id_mascota,
        id_cliente: req.body.id_cliente,
        fecha_solicitud: req.body.fecha_solicitud || new Date(), // Fecha actual por defecto si no se especifica
        estado: req.body.estado || 'Pendiente', // Estado por defecto "Pendiente"
        comentarios: req.body.comentarios || null // Comentarios opcionales
    };

    // Usar Sequelize para crear la solicitud en la base de datos
    SolicitudesAdopcion.create(dataset)
        .then((resultado) => {
            res.status(200).json({
                mensaje: "Solicitud de Adopción Creada con Éxito",
                data: resultado
            });
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `Solicitud de Adopción No creada ::: ${err}`
            });
        });
};

// Buscar todas las solicitudes de adopción
const buscarSolicitudesAdopcion = (req, res) => {
    // Usar Sequelize para obtener todas las solicitudes de adopción
    SolicitudesAdopcion.findAll()
        .then((resultado) => {
            res.status(200).json(resultado); // Devolver todas las solicitudes en formato JSON
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `No se encontraron registros ::: ${err}`
            });
        });
};

// Buscar solicitud de adopción por ID
const buscarIdSolicitudAdopcion = (req, res) => {
    const id = req.params.id; // Obtener ID de los parámetros de la URL
    if (!id) {
        res.status(400).json({
            mensaje: "El ID no puede estar vacío"
        });
        return;
    }

    // Usar Sequelize para buscar la solicitud por su ID
    SolicitudesAdopcion.findByPk(id)
        .then((resultado) => {
            if (resultado) {
                res.status(200).json(resultado); // Devolver la solicitud si se encuentra
            } else {
                res.status(404).json({
                    mensaje: "Solicitud de Adopción no encontrada"
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `Error al buscar solicitud ::: ${err}`
            });
        });
};

// Actualizar solicitud de adopción
const actualizarSolicitudAdopcion = (req, res) => {
    const id = req.params.id; // Obtener ID de los parámetros de la URL
    if (!id) {
        res.status(400).json({
            mensaje: "El ID no puede estar vacío"
        });
        return;
    }

    // Crear dataset con los datos a actualizar basados en la solicitud
    const datosActualizar = {
        id_mascota: req.body.id_mascota || undefined,
        id_cliente: req.body.id_cliente || undefined,
        fecha_solicitud: req.body.fecha_solicitud || undefined,
        estado: req.body.estado || undefined,
        comentarios: req.body.comentarios || undefined
    };

    // Eliminar los campos no proporcionados o vacíos
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

    // Usar Sequelize para actualizar la solicitud de adopción
    SolicitudesAdopcion.update(datosActualizar, { where: { id_solicitud: id } })
        .then((resultado) => {
            if (resultado[0] === 1) { // Verificar si se actualizó alguna fila
                res.status(200).json({
                    tipo: 'success',
                    mensaje: "Solicitud actualizada con éxito"
                });
            } else {
                res.status(404).json({
                    tipo: 'error',
                    mensaje: "Solicitud no encontrada o sin cambios"
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                tipo: 'error',
                mensaje: `Error al actualizar solicitud ::: ${err}`
            });
        });
};

// Eliminar solicitud de adopción
const eliminarSolicitudAdopcion = (req, res) => {
    const id = req.params.id; // Obtener ID de los parámetros de la URL
    if (!id) {
        res.status(400).json({
            mensaje: "El ID no puede estar vacío"
        });
        return;
    }

    // Usar Sequelize para eliminar la solicitud por su ID
    SolicitudesAdopcion.destroy({ where: { id_solicitud: id } })
        .then((resultado) => {
            if (resultado === 1) { // Verificar si se eliminó alguna fila
                res.status(200).json({
                    tipo: 'success',
                    mensaje: "Solicitud eliminada con éxito"
                });
            } else {
                res.status(404).json({
                    tipo: 'error',
                    mensaje: "Solicitud no encontrada"
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                tipo: 'error',
                mensaje: `Error al eliminar solicitud ::: ${err}`
            });
        });
};

// Exportar las funciones para su uso en las rutas
export { crearSolicitudAdopcion, eliminarSolicitudAdopcion, actualizarSolicitudAdopcion, buscarIdSolicitudAdopcion, buscarSolicitudesAdopcion };
