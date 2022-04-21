module.exports = function veterinaria(recursos) {
    return {
        get: (data, callback) => {
            if (typeof data.indice !== 'undefined') {
                if (recursos.veterinaria[data.indice]) {
                    return callback(200, recursos.veterinaria[data.indice]);
                } else {
                    return callback(404, { mensaje: 'Mascota no Encontrada' });
                }
            }

            callback(200, recursos.veterinaria);
        },
        post: (data, callback) => {
            recursos.veterinaria.push(data.payload);
            callback(201, data.payload);
        },
        put: (data, callback) => {
            if (typeof data.indice !== "undefined") {
                if (recursos.veterinaria[data.indice]) {
                    recursos.veterinaria[data.indice] = data.payload;
                    return callback(200, recursos.veterinaria[data.indice]);
                } else {
                    return callback(404, { mensaje: 'Mascota no Encontrada' });
                }
            }

            callback(400, { mensaje: 'Mascota no encontrada' });
        },
        delete: (data, callback) => {
            if (typeof data.indice !== "undefined") {
                if (recursos.veterinaria[data.indice]) {
                    recursos.veterinaria = recursos.veterinaria.filter((_veterinario, indice) => indice != data.indice);
                    return callback(202, recursos.veterinaria[data.indice]);
                } else {
                    return callback(404, { mensaje: 'Mascota no Encontrada' });
                }
            }

            callback(400, { mensaje: 'Mascota no encontrada' });
        },
    }
}