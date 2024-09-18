import { Mascotas } from "../modelos/mascotaModelo.js";

//Crear un recurso Mascota
const crearMascota = (req, res) => {

    // Validar
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

    // Crear dataset con los datos del cuerpo de la solicitud (req.body)
    const dataset = {
        nombre: req.body.nombre,
        especie: req.body.especie,
        raza: req.body.raza || null,
        edad: req.body.edad || null,
        sexo: req.body.sexo || null,
        peso: req.body.peso || null,
        descripcion: req.body.descripcion || null,
        estado: req.body.estado || 'Disponible',
        fecha_ingreso: req.body.fecha_ingreso || new Date(), // Establece la fecha actual por defecto
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
            res.status(200).json(resultado);
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `No se encontraron registros ::: ${err}`
            });
        });
}

// Buscar Mascota por ID
const buscarIdMascota = (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({
            mensaje: "El ID no puede estar vacío"
        });
        return;
    }

    Mascotas.findByPk(id)
        .then((resultado) => {
            if (resultado) {
                res.status(200).json(resultado);
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
    const id = req.params.id;
    if (!id) {
        res.status(400).json({
            mensaje: "El ID no puede estar vacío"
        });
        return;
    }

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

    Mascotas.update(datosActualizar, { where: { id_mascota: id } })
        .then((resultado) => {
            if (resultado[0] === 1) {
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
    const id = req.params.id;
    if (!id) {
        res.status(400).json({
            mensaje: "El ID no puede estar vacío"
        });
        return;
    }

    Mascotas.destroy({ where: { id_mascota: id } })
        .then((resultado) => {
            if (resultado === 1) {
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



export {crearMascota,eliminarMascota,actualizarMascota,buscarIdMascota,buscarMascota}