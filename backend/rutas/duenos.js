module.exports = function duenos(recursos) {
    return {
        get: (data, callback) => {
            if (typeof data.indice !== 'undefined') {
                if (recursos.duenos[data.indice]) {
                    return callback(200, recursos.duenos[data.indice]);
                } else {
                    return callback(404, { mensaje: 'Mascota no Encontrada' });
                }
            }

            callback(200, recursos.duenos);
        },
        post: (data, callback) => {
            recursos.duenos.push(data.payload);
            callback(201, data.payload);
        },
        put: (data, callback) => {
            if (typeof data.indice !== "undefined") {
                if (recursos.duenos[data.indice]) {
                    recursos.duenos[data.indice] = data.payload;
                    return callback(200, recursos.duenos[data.indice]);
                } else {
                    return callback(404, { mensaje: 'Mascota no Encontrada' });
                }
            }

            callback(400, { mensaje: 'Mascota no encontrada' });
        },
        delete: (data, callback) => {
            if (typeof data.indice !== "undefined") {
                if (recursos.duenos[data.indice]) {
                    recursos.duenos = recursos.duenos.filter((_dueno, indice) => indice != data.indice);
                    return callback(202, recursos.duenos[data.indice]);
                } else {
                    return callback(404, { mensaje: 'Mascota no Encontrada' });
                }
            }

            callback(400, { mensaje: 'Mascota no encontrada' });
        },
    }
}