const recursos = require('./recursos');
const mascotas = require('./rutas/mascotas');
const veterinaria = require('./rutas/veterinaria');
const duenos = require('./rutas/duenos');
const consultas = require('./rutas/consultas');
module.exports = {
    ruta: (data, callback) => {
        callback(200, { mensaje: 'Ruta Encontrada' });

    },
    mascotas: mascotas(recursos),
    veterinaria: veterinaria(recursos),
    duenos: duenos(recursos),
    consultas: consultas(recursos),
    noEncontrado: (data, callback) => {
        callback(404, { mensaje: 'Ruta no encontrada' });
    },
}