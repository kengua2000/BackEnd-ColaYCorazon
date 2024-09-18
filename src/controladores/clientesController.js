import { Clientes } from "../modelos/clienteModelo.js";

// Crear un recurso Cliente
const crearCliente = (req, res) => {
    // Validar
    if (!req.body.nombre || !req.body.apellido) {
        res.status(400).send({
            mensaje: "El nombre y apellido no pueden estar vacíos."
        });
        return;
    }

    // Crear dataset con los datos del cuerpo de la solicitud (req.body)
    const dataset = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion || null,
        telefono: req.body.telefono || null,
        email: req.body.email || null,
        fecha_registro: req.body.fecha_registro || new Date()
    };

    // Usar Sequelize para crear el recurso en la base de datos
    Clientes.create(dataset).then((resultado) => {
        res.status(200).json({
            mensaje: "Registro de Cliente Creado con Éxito",
            data: resultado
        });
    }).catch((err) => {
        res.status(500).json({
            mensaje: `Registro de Cliente No creado ::: ${err}`
        });
    });
};

// Buscar todos los Clientes
const buscarClientes = (req, res) => {
    Clientes.findAll()
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `No se encontraron registros ::: ${err}`
            });
        });
};

// Buscar Cliente por ID
const buscarIdCliente = (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({
            mensaje: "El ID no puede estar vacío"
        });
        return;
    }

    Clientes.findByPk(id)
        .then((resultado) => {
            if (resultado) {
                res.status(200).json(resultado);
            } else {
                res.status(404).json({
                    mensaje: "Cliente no encontrado"
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `Error al buscar cliente ::: ${err}`
            });
        });
};

// Actualizar Cliente
const actualizarCliente = (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({
            mensaje: "El ID no puede estar vacío"
        });
        return;
    }

    const datosActualizar = {
        nombre: req.body.nombre || undefined,
        apellido: req.body.apellido || undefined,
        direccion: req.body.direccion || undefined,
        telefono: req.body.telefono || undefined,
        email: req.body.email || undefined,
        fecha_registro: req.body.fecha_registro || undefined
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

    Clientes.update(datosActualizar, { where: { id_cliente: id } })
        .then((resultado) => {
            if (resultado[0] === 1) {
                res.status(200).json({
                    tipo: 'success',
                    mensaje: "Registro actualizado con éxito"
                });
            } else {
                res.status(404).json({
                    tipo: 'error',
                    mensaje: "Cliente no encontrado o sin cambios"
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                tipo: 'error',
                mensaje: `Error al actualizar registro ::: ${err}`
            });
        });
};

// Eliminar Cliente
const eliminarCliente = (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({
            mensaje: "El ID no puede estar vacío"
        });
        return;
    }

    Clientes.destroy({ where: { id_cliente: id } })
        .then((resultado) => {
            if (resultado === 1) {
                res.status(200).json({
                    tipo: 'success',
                    mensaje: "Registro eliminado con éxito"
                });
            } else {
                res.status(404).json({
                    tipo: 'error',
                    mensaje: "Cliente no encontrado"
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                tipo: 'error',
                mensaje: `Error al eliminar registro ::: ${err}`
            });
        });
};

export { crearCliente, eliminarCliente, actualizarCliente, buscarIdCliente, buscarClientes };
