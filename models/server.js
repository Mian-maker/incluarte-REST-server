// Importaciones de paquetes npm
/** 
 * Documentacion de express:
 *  https://www.npmjs.com/package/express
 * Documentacion de cors:
 *  https://www.npmjs.com/package/cors */
 const express = require('express');
 const cors = require('cors');
 
/**
 * @class Server
 * @constructor Server()
 * 
 * @description Se crea una clase para poder agrupar y utilizar los metodos necesarios para
 * utilizar express como servidor y gestionar de manera mas sencilla las rutas y los middlewares.
 * 
 * @example const Server = require('./models/server');
 * const server = new Server();
 * server.listen();
 * 
 * @author Ian Macedo
 * @requires express
 * @requires cors
 */
 
class Server {
    /**
      * @constructor Server()
      * 
      * @description En el constructor de la clase se definiran las variables necesarias
      * para inicialisar nuestro modelo de servidor y tambien los paquetes y funcones
      * que se necesitaran para ejecutar de manera correcta nuestro modelo
      */
 
    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.port = process.env.PORT;
 
        // Paths
        this.usersPATH = '/incluarte/users'; 
        this.museumsPATH = '/incluarte/museums';
    
        // Middlewares
        this.middlewares();
 
        // Rutas de la aplicacion
        this.routes();
     }
 
    /**
     * @function middlewares()
     * 
     * @description En este metodo se definen que middlewares seran necesarios para ejecutar
     * nuestro servidor REST
     */
 
    middlewares() {
        // Directorio publico
        this.app.use(cors());
        //this.app.use(express.static('public'));
    }
 
     /**
      * @function routes()
      * 
      * @description El metodo routes espara definir en que ruta se ejecutaran nuestras funciones
      * definidas dentro de cada archivo de la carpeta de rutas. Se debera agregar una ruta
      * nueva por cada controlador que se agregue
      */
 
    routes() {
        this.app.use(this.usersPATH, require('../routes/users'));
        // this.app.use(this.museumsPATH, require('../routes/museum'));
    }
 
    /**
     * @function listen()
     * 
     * @description El metodo listen nos servira para ejecutar nuestro servidor
     * y poder llamar nuestras funciones desde nuestro cliente
     */
 
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ', this.port);
        });
    }
 }
 
// Se exporta la clase Server
module.exports = Server;
