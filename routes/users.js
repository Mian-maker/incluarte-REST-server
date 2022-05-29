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
    getUser,
    getMedals,
    getUserMedals,
    getCards,
    getRewards,
    login
  } = require('../controllers/users'); // Se importan las funciones del controlador 
 
 // Inicializacion del Router
 const router = Router();
 
 // Rutas de metodos GET
 router.get('/getUser/user=:id_user', getUser);
 router.get('/getMedals', getMedals);
 router.get('/getUserMedals/user=:id_user', getUserMedals);
 router.get('/getCards/user=:id_user', getCards);
 router.get('/getRewards/user=:id_user', getRewards);
 
 // Rutas de metodos PUT
 
 // Rutas de metodos POST
 router.post('/login', login);

 // Rutas de metodos DELETE
 
 module.exports = router;
