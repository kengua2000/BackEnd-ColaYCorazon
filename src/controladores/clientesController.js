import { Clientes } from "../modelos/clienteModelo.js"; 
import { Op } from "sequelize"; // Importar el modelo Clientes

const buscarClientesPorFiltro = (req, res) => {
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
            { apellido: { [Op.like]: `%${filtro}%` } },
            { direccion: { [Op.like]: `%${filtro}%` } },
            { telefono: { [Op.like]: `%${filtro}%` } },
            { email: { [Op.like]: `%${filtro}%` } }
        ]
    };

    // Usar Sequelize para buscar clientes que coincidan con el filtro en cualquier columna
    Clientes.findAll({ where: condicionesBusqueda })
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado); // Devolver los registros encontrados
            } else {
                res.status(404).json({
                    mensaje: "No se encontraron clientes con el filtro proporcionado"
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `Error al buscar clientes ::: ${err}`
            });
        });
};


// Crear un recurso Cliente
const crearCliente = (req, res) => {
    // Validar campos obligatorios
    if (!req.body.nombre || !req.body.apellido) {
        res.status(400).send({
            mensaje: "El nombre y apellido no pueden estar vacíos."
        });
        return;
    }

    // Crear dataset con los datos recibidos del cuerpo de la solicitud
    const dataset = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion || null,
        telefono: req.body.telefono || null,
        email: req.body.email || null,
        fecha_registro: req.body.fecha_registro || new Date() // Fecha actual por defecto
    };

    // Usar Sequelize para crear el cliente en la base de datos
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
    // Usar Sequelize para obtener todos los registros de Clientes
    Clientes.findAll()
        .then((resultado) => {
            res.status(200).json(resultado); // Devolver los registros en formato JSON
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `No se encontraron registros ::: ${err}`
            });
        });
};

// Buscar Cliente por ID
const buscarIdCliente = (req, res) => {
    const id = req.params.id; // Obtener ID de los parámetros de la URL
    if (!id) {
        res.status(400).json({
            mensaje: "El ID no puede estar vacío"
        });
        return;
    }

    // Usar Sequelize para buscar un cliente por clave primaria (ID)
    Clientes.findByPk(id)
        .then((resultado) => {
            if (resultado) {
                res.status(200).json(resultado); // Devolver los datos del cliente si se encuentra
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
    const id = req.params.id; // Obtener ID de los parámetros de la URL
    if (!id) {
        res.status(400).json({
            mensaje: "El ID no puede estar vacío"
        });
        return;
    }

    // Crear dataset con los datos a actualizar, basándose en los valores recibidos del cuerpo de la solicitud
    const datosActualizar = {
        nombre: req.body.nombre || undefined,
        apellido: req.body.apellido || undefined,
        direccion: req.body.direccion || undefined,
        telefono: req.body.telefono || undefined,
        email: req.body.email || undefined,
        fecha_registro: req.body.fecha_registro || undefined
    };

    // Filtrar los campos vacíos o indefinidos
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

    // Usar Sequelize para actualizar el cliente
    Clientes.update(datosActualizar, { where: { id_cliente: id } })
        .then((resultado) => {
            if (resultado[0] === 1) { // Verificar si se actualizó algún registro
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
    const id = req.params.id; // Obtener ID de los parámetros de la URL
    if (!id) {
        res.status(400).json({
            mensaje: "El ID no puede estar vacío"
        });
        return;
    }

    // Usar Sequelize para eliminar el cliente por su ID
    Clientes.destroy({ where: { id_cliente: id } })
        .then((resultado) => {
            if (resultado === 1) { // Verificar si se eliminó algún registro
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

// Exportar las funciones para su uso en las rutas
export { crearCliente, eliminarCliente, actualizarCliente, buscarIdCliente, buscarClientes,buscarClientesPorFiltro
    
 };
