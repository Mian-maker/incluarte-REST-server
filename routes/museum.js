/**
 * @description El archivo de rutas exportara el router con los metodos correspondientes
 * del controlador y este router debera ser llamado por la clase Server en el metodo
 * routes() donde se definira la ruta o endpoint completo que el cliente usara para
 * llamar los metodos
 * 
 * @example this.app.use(this.usuariosPATH, require('../routes/usuarios'));
 * 
 * @requires express { Router }
 * @requires ../controllers/usuarios
 * 
 * @exports Router
 * 
 * @author Ian Macedo
 */

// Importaciones de paquetes npm
/**
 * Documentacion Router (express)
 *  http://expressjs.com/en/4x/api.html#express.router */
 const { Router } = require('express');

 // Importaciones propias
 const {
    getMuseums,
    getMuseum,
    getTickets,
    getArtworks,
    getEvents,
    getCollections
  } = require('../controllers/museum'); // Se importan las funciones del controlador 
 
 // Inicializacion del Router
 const router = Router();
 
 // Rutas de metodos GET
 router.get('/getMuseums', getMuseums);;
 router.get('/getMuseum/museum=:id_museum', getMuseum);
 router.get('/getTickets/user=:id_user', getTickets);
 router.get('/getArtworks/museum=:id_museum', getArtworks);
 router.get('/getEvents/museum=:id_museum', getEvents);
 router.get('/getCollections/museum=:id_museum', getCollections);
 
 // Rutas de metodos PUT
 
 // Rutas de metodos POST


 // Rutas de metodos DELETE
 
 module.exports = router;
