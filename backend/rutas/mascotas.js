module.exports = function mascotas(recursos) {
    return {
        get: (data, callback) => {
            if (typeof data.indice !== 'undefined') {
                if (recursos.mascotas[data.indice]) {
                    return callback(200, recursos.mascotas[data.indice]);
                } else {
                    return callback(404, {
                        mensaje: 'Mascota no Encontrada'
                    });
                }
            }
			if(
				data.query && 
				(typeof data.query.Nombre !=="undefined" || 
					data.query.Raza !== "undefined" || 
					data.query.Edad !== "undefined")
			){
				const llavesQuery = Object.keys(data.query);
				let  respuestasMascotas = [...recursos.mascotas];
				for(const llave of llavesQuery){
					respuestasMascotas = respuestasMascotas.filter(
						(_mascota)=>_mascota[llave] === data.query[llave]);
				}
				return callback(200 , respuestasMascotas);
			}
            callback(200, recursos.mascotas);
        },
        post: (data, callback) => {
            recursos.mascotas.push(data.payload);
            callback(201, data.payload);
        },
        put: (data, callback) => {
            if (typeof data.indice !== "undefined") {
                if (recursos.mascotas[data.indice]) {
                    recursos.mascotas[data.indice] = data.payload;
                    return callback(200, recursos.mascotas[data.indice]);
                } else {
                    return callback(404, {
                        mensaje: 'Mascota no Encontrada'
                    });
                }
            }

            callback(400, {
                mensaje: 'Mascota no encontrada'
            });
        },
        delete: (data, callback) => {
            if (typeof data.indice !== "undefined") {
                if (recursos.mascotas[data.indice]) {
                    recursos.mascotas = recursos.mascotas.filter(
						(_mascota, indice) => indice != data.indice);
                    return callback(202, recursos.mascotas[data.indice]);
                } else {
                    return callback(404, {
                        mensaje: 'Mascota no Encontrada'
                    });
                }
            }

            callback(400, {
                mensaje: 'Mascota no encontrada'
            });
        },
    }
}
