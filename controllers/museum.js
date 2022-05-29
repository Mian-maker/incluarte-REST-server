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
    
const getMuseums = (req = request, res = response) => {
    var query = 'SELECT id_museum, name, description, location, ticket_cost, days, open_hr, close_hr FROM Museums'; // Sentencia SQL
   
    db.executeQuery(query)
        .then(([rows, fields]) => { 
            res.json(rows);
              
            db.releasePool(); // Se libera la conexion para permitir ejecutar una sentencia nueva
        }).catch((err) => {
            res.json({
                msg: 'Fallo al obtener la lista de los museo',
                err
            });
        });
}
  

const getMuseum = (req = request, res = response) => {
    const { id_museum } = req.params;
    var query = 'SELECT * FROM Museums WHERE id_museum = ?'; // Sentencia SQL
   
    db.executeQuery(query, id_museum)
        .then(([rows, fields]) => { 
            res.json(rows);
              
            db.releasePool(); // Se libera la conexion para permitir ejecutar una sentencia nueva
        }).catch((err) => {
            res.json({
                msg: 'Fallo al obtener el museo',
                err
            });
        });
}


const getTickets = (req = request, res = response) => {
    const { id_user } = req.params;
    var query = 'SELECT * FROM Tickets WHERE id_user = ?'; // Sentencia SQL
   
    db.executeQuery(query, id_user)
        .then(([rows, fields]) => { 
            res.json(rows);
              
            db.releasePool(); // Se libera la conexion para permitir ejecutar una sentencia nueva
        }).catch((err) => {
            res.json({
                msg: 'Fallo al obtener los tickets',
                err
            });
        });
}


const getArtworks = (req = request, res = response) => {
    const { id_museum } = req.params;
    var query = 'SELECT * FROM Artworks WHERE id_museum = ?'; // Sentencia SQL
   
    db.executeQuery(query, id_museum)
        .then(([rows, fields]) => { 
            res.json(rows);
              
            db.releasePool(); // Se libera la conexion para permitir ejecutar una sentencia nueva
        }).catch((err) => {
            res.json({
                msg: 'Fallo al obtener las piezas del museo',
                err
            });
        });
}


const getEvents = (req = request, res = response) => {
    const { id_museum } = req.params;
    var query = 'SELECT * FROM Events WHERE id_museum = ?'; // Sentencia SQL
   
    db.executeQuery(query, id_museum)
        .then(([rows, fields]) => { 
            res.json(rows);
              
            db.releasePool(); // Se libera la conexion para permitir ejecutar una sentencia nueva
        }).catch((err) => {
            res.json({
                msg: 'Fallo al obtener los eventos',
                err
            });
        });
}


const getCollections = (req = request, res = response) => {
    const { id_museum } = req.params;
    var query = 'SELECT * FROM Collections WHERE id_museum = ?'; // Sentencia SQL
   
    db.executeQuery(query, id_museum)
        .then(([rows, fields]) => { 
            res.json(rows);
              
            db.releasePool(); // Se libera la conexion para permitir ejecutar una sentencia nueva
        }).catch((err) => {
            res.json({
                msg: 'Fallo al obtener las colecciones del el museo',
                err
            });
        });
}
 
  
module.exports = {
    getMuseums,
    getMuseum,
    getTickets,
    getArtworks,
    getEvents,
    getCollections
}
   