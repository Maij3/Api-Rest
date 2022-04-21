const url = require('url');
const router = require('./router');
const StringDecoder = require('string_decoder').StringDecoder;
module.exports = (req, res) => {
    // 1. Obtener url desde el objeto request OK
    const urlString = req.url;
    const urlParseada = url.parse(urlString, true);
    // 2.- Obtener la Ruta
    const ruta = urlParseada.pathname;
    //3 .- Quitar el Slash
    const rutaLimpia = ruta.replace(/^\/+|\/+$/g, '');
    //3.1  Metodo
    const metodo = req.method.toLowerCase();
    //3.1.1 Permisos de CORS
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', "*");
    res.setHeader("Access-Control-Request-Methods",
        "OPTIONS, GET, PUT, DELETE, POST");
    res.setHeader("Access-Control-Allow-Methods",
        "OPTIONS, GET, PUT, DELETE, POST");


    if (metodo === 'options') {
        res.writeHead(200);
        res.end();
        return;
    }
    //3.2 query
    const {
        query = {}
    } = urlParseada;
    //3.3 Obtener los headers
    const {
        headers = {}
    } = req;
    //3.4 Obtener payload, en el caso de haber uno
    const decoder = new StringDecoder("utf8");
    let buffer = '';
    req.on("data", (data) => {
        buffer += decoder.write(data);
    });
    req.on("end", () => {
        buffer += decoder.end();
        if (headers["content-type"] === "application/json") {
            buffer = JSON.parse(buffer);
        }
        //3.4.1 Mirar si tiene Subrutas 
        //   let indice = null;
        if (rutaLimpia.indexOf("/") > -1) {
            var [rutaPrincipal, indice] = rutaLimpia.split("/");
        }
        //3.5 //Variable Data
        const data = {
            indice,
            ruta: rutaPrincipal || rutaLimpia,
            query,
            metodo,
            headers,
            payload: buffer,
        };
        console.log(data);
        //3.7  handle  Eliger el manejador dependiendo de la ruta y asignarle una funcion
        let handler;
        if (data.ruta && router[data.ruta] && router[data.ruta][metodo]) {
            handler = router[data.ruta][metodo];

        } else {
            handler = router.noEncontrado;
        }

        //4 Enviar la respuesta de la ruta
        if (typeof handler === 'function') {
            handler(data, (statusCode = 200, mensaje) => {
                const respuesta = JSON.stringify(mensaje);
                res.setHeader('Content-type', 'application/json');
                res.writeHead(statusCode);
                res.end(respuesta);
            })
        }
    });

};
