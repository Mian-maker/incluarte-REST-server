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
   
const getUser = (req = request, res = response) => {
    const { id_user } = req.params;
    var query = 'SELECT * FROM Users WHERE id_user = ?'; // Sentencia SQL
  
    db.executeQuery(query, id_user)
        .then(([rows, fields]) => { 
            res.json(rows);
             
            db.releasePool(); // Se libera la conexion para permitir ejecutar una sentencia nueva
        }).catch((err) => {
            res.json({
                msg: 'Fallo al obtener el Usuario',
                err
            });
        });
}
 

const getMedals = (req = request, res = response) => {
    var query = 'SELECT * FROM Medals'; // Sentencia SQL
  
    db.executeQuery(query)
        .then(([rows, fields]) => { 
            res.json(rows);
             
            db.releasePool(); // Se libera la conexion para permitir ejecutar una sentencia nueva
        }).catch((err) => {
            res.json({
                msg: 'Fallo al obtener las medallas',
                err
            });
        });
}


const getUserMedals = (req = request, res = response) => {
    const { id_user } = req.params;
    var query = 'SELECT * FROM Users_has_Medals WHERE id_user = ?'; // Sentencia SQL
  
    db.executeQuery(query, id_user)
        .then(([rows, fields]) => { 
            res.json(rows);
             
            db.releasePool(); // Se libera la conexion para permitir ejecutar una sentencia nueva
        }).catch((err) => {
            res.json({
                msg: 'Fallo al obtener las insinias del usuario',
                err
            });
        });
}


const getCards = (req = request, res = response) => {
    const { id_user } = req.params;
    var query = 'SELECT * FROM Cards WHERE id_user = ?'; // Sentencia SQL
  
    db.executeQuery(query, id_user)
        .then(([rows, fields]) => { 
            res.json(rows);
             
            db.releasePool(); // Se libera la conexion para permitir ejecutar una sentencia nueva
        }).catch((err) => {
            res.json({
                msg: 'Fallo al obtener las tarjetas del usuario',
                err
            });
        });
}


const getRewards = (req = request, res = response) => {
    const { id_user } = req.params;
    var query = 'SELECT * FROM Rewards WHERE id_user = ?'; // Sentencia SQL
  
    db.executeQuery(query, id_user)
        .then(([rows, fields]) => { 
            res.json(rows);
             
            db.releasePool(); // Se libera la conexion para permitir ejecutar una sentencia nueva
        }).catch((err) => {
            res.json({
                msg: 'Fallo al obtener las recompensas del usuario',
                err
            });
        });
}


const login = (req = request, res = response) => {
    const { mail, password } = req.body;
    
    db.executeQuery('SELECT * FROM Users WHERE mail = ?', [mail])
        .then(([result]) => { 
            if(result.length == 0) {
                return res.status(500).json({
                    msg: 'El correo es incorrecto o no existe'
                });
            } else if(Object.values(result)[0].pwd != password) {
                return res.status(500).json({
                    msg: 'La contraseña es incorrecta'
                });
            } else {
                return res.status(200).json({
                    msg: 'Acceso permitido'
                })
            }
             
            db.releasePool();
        }).catch((err) => {
            console.log(err)
        });
}

 
module.exports = {
    getUser,
    getMedals,
    getUserMedals,
    getCards,
    getRewards,
    login
}
  