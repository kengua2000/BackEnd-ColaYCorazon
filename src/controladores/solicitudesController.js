import { SolicitudesAdopcion  } from "../modelos/solicitudModelo.js";

// Crear una nueva solicitud de adopción
const crearSolicitudAdopcion = (req, res) => {
    console.log("Solicitud de adopción recibida", req.body);
    // Validar
    if (!req.body.id_mascota || !req.body.id_cliente) {
        res.status(400).send({
            mensaje: "La ID de la mascota y la ID del adoptante son obligatorias."
        });
        return;
    }

    // Crear dataset con los datos del cuerpo de la solicitud
    const dataset = {
        id_mascota: req.body.id_mascota,
        id_cliente: req.body.id_cliente,
        fecha_solicitud: req.body.fecha_solicitud || new Date(),
        estado: req.body.estado || 'Pendiente',
        comentarios: req.body.comentarios || null
    };

    // Usar Sequelize para crear la solicitud en la base de datos
    SolicitudesAdopcion.create(dataset).then((resultado) => {
        res.status(200).json({
            mensaje: "Solicitud de Adopción Creada con Éxito",
            data: resultado
        });
    }).catch((err) => {
        res.status(500).json({
            mensaje: `Solicitud de Adopción No creada ::: ${err}`
        });
    });
};

// Buscar todas las solicitudes de adopción
const buscarSolicitudesAdopcion = (req, res) => {
    SolicitudesAdopcion.findAll()
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `No se encontraron registros ::: ${err}`
            });
        });
};

// Buscar solicitud de adopción por ID
const buscarIdSolicitudAdopcion = (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({
            mensaje: "El ID no puede estar vacío"
        });
        return;
    }

    SolicitudesAdopcion.findByPk(id)
        .then((resultado) => {
            if (resultado) {
                res.status(200).json(resultado);
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
    const id = req.params.id;
    if (!id) {
        res.status(400).json({
            mensaje: "El ID no puede estar vacío"
        });
        return;
    }

    const datosActualizar = {
        id_mascota: req.body.id_mascota || undefined,
        id_cliente: req.body.id_cliente || undefined,
        fecha_solicitud: req.body.fecha_solicitud || undefined,
        estado: req.body.estado || undefined,
        comentarios: req.body.comentarios || undefined
    };

    // Filtrar campos vacíos
    Object.keys(datosActualizar).forEach(key => {
        if (datosActualizar[key] === undefined) {
            delete datosActualizar[key];
        }
    });

    if (Object.keys(datosActualizar).length === 0) {
        res.status(400).json({
            mensaje: "No se proporcionaron datos para actualizar"
        });
        return;
    }

    SolicitudesAdopcion.update(datosActualizar, { where: { id_solicitud: id } })
        .then((resultado) => {
            if (resultado[0] === 1) {
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
    const id = req.params.id;
    if (!id) {
        res.status(400).json({
            mensaje: "El ID no puede estar vacío"
        });
        return;
    }

    SolicitudesAdopcion.destroy({ where: { id_solicitud: id } })
        .then((resultado) => {
            if (resultado === 1) {
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

export { crearSolicitudAdopcion, eliminarSolicitudAdopcion, actualizarSolicitudAdopcion, buscarIdSolicitudAdopcion, buscarSolicitudesAdopcion };
