/**
 * @description Los controladores almacenan las funciones que retornan una respuesta a un cliente
 * que envia una solicitud para ejecutar un metodo. Se agrupan para abarcar cierta funcionalidad o modulo
 * 
 * @requires express { response, request }
 * @requires database
 * 
 * @exports {  }
 * 
 * @author Ian Macedo
 */

// Importaciones de paquetes npm
/**
 * Documentacion Response (express)
 *  http://expressjs.com/en/4x/api.html#res
 * Documentacion Request (express)
 *  http://expressjs.com/en/4x/api.html#req */
 const { response, request } = require('express');

 // Importaciones propias
 const database = require('../models/mysql'); // Clase para BD
   
 // Se crea una variable y se inicializa con el modelo de la BD
 const db = new database();
   
 const getUsuarios = (req = request, res = response) => {
     var query = 'SELECT * FROM Usuarios'; // Sentencia SQL
   
     /* Llamado a la funcion para ejecutar la sentencia SQL, ya que esta funcion
        retorna una promesa se debe de incluir un bloque .then().catch() */
     db.executeQuery(query)
         .then(([rows, fields]) => { // Se responde la peticion en forma de JSON y se envia el contenido de la consulta
             res.json(rows);
              
             db.releasePool(); // Se libera la conexion para permitir ejecutar una sentencia nueva
         }).catch((err) => {
             /* En caso de alguna excepcion se controla y se envia un mensaje personalizado y la
                excepcion para detectar el error en forma de JSON */
             res.json({
                 msg: 'Fallo al obtener a los Usuarios',
                 err
             });
         });
 }
 
 
 module.exports = {
     getUsuarios
 }
  