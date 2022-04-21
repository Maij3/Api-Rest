module.exports = function consultas({ consultas, veterinaria, mascotas, duenos }) {
    return {
        get: (data, callback) => {
            if (typeof data.indice !== 'undefined') {
                if (consultas[data.indice]) {
                    return callback(200, consultas[data.indice]);
                } else {
                    return callback(404, { mensaje: 'Consulta no Encontrada' });
                }
            }
            const consultaConRelaciones = consultas.map((consulta) => ({...consulta,
                mascota: {...mascotas[consulta.mascota], id: consulta.mascota },
                veterinaria: {...veterinaria[consulta.veterinaria], id: consulta.veterinaria },
                dueno: {...duenos[consulta.dueno], id: consulta.dueno }
            }));
            callback(200, consultaConRelaciones);
        },
        post: (data, callback) => {
            let new_consulta = data.payload;
            consultas.fechaCreacion = new Date();
            consultas.fechaEdicion = null;
            consultas = [...consultas, new_consulta];
            //recursos.consultas.push(data.payload);
            callback(201, new_consulta);
        },
        put: (data, callback) => {
            if (typeof data.indice !== "undefined") {
                if (consultas[data.indice]) {
                    const { fechaCreacion } = consultas[data.indice];
                    consultas[data.indice] = {
                            ...data.payload,
                            fechaCreacion,
                            fechaEdicion: new Date(),
                        }
                        //  recursos.consultas[data.indice] = data.payload;
                    return callback(200, consultas[data.indice]);
                } else {
                    return callback(404, { mensaje: 'Mascota no Encontrada' });
                }
            }

            callback(400, { mensaje: 'Mascota no encontrada' });
        },
        delete: (data, callback) => {
            if (typeof data.indice !== "undefined") {
                if (consultas[data.indice]) {
                    consultas = consultas.filter((_consulta, indice) => indice != data.indice);
                    return callback(202, consultas[data.indice]);
                } else {
                    return callback(404, { mensaje: 'Mascota no Encontrada' });
                }
            }

            callback(400, { mensaje: 'Mascota no encontrada' });
        },
    }
}