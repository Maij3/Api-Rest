const http = require('http');
const request_handler = require('./request-handler');
/* global.recursos = {
    mascotas: [
        { nombre: 'Golfo', peso: '4kg', edad: '6', raza: 'POODLE' },
        { nombre: 'Malala', peso: '4kg', edad: '6', raza: 'PUG' }
    ]
} */
const server = http.createServer(request_handler);
server.listen(5000, () => {
    try {
        console.log('CONECTADO');
    } catch (error) {
        console.log('DESCONECTADO');
    }
});
