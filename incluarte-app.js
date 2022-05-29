// Importaciones de paquetes npm
/**
 * Documentacion dotenv
 *  https://www.npmjs.com/package/dotenv */
 require('dotenv').config();

 // Importaciones propias
 const Server = require('./models/server');
 
 /* Se inicializa nuestra clase servidor y se ejecuta
    el express server con el metodo listen */
 const server = new Server();
 server.listen();
