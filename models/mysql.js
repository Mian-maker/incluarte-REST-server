// Importaciones de paquetes npm
/* Referencias de mysql2
 * https://www.npmjs.com/package/mysql
 * https://www.npmjs.com/package/mysql2 */
 const mysql = require('mysql2');

 /**
 * @class database
 * @constructor database()
 * 
 * @description Se crea una clase para poder exportar los metodos necesarios para conectar a la
 * base de datos, ejecutar sentensias SQL y otras funciones necesarias. Se podran ir agregando
 * otras funciones si es necesario y si se relacionan a la utilizacion de la base de datos, a
 * la creacion de sentencias SQL, etc. 
 * 
 * @example const database = require('../models/database');
 *          const db = new database();
 * 
 * @author Ian Macedo
 * @requires mysql2
 */

class database {
    constructor() {} // Declaracion del constructor de la clase, de momento queda vacio

    /**
     * @function createPool()
     * @returns pool
     * 
     * @description El metodo createPool sirve para establecer la conexion a la base
     * de datos ya que ayudan a reducir el timpo dedicado a conectarse al servidor
     * de MySQL al reutilizar una conexion anterior, dejando abierta la conexion
     * en vez de cerrarla por completo cuando se haya terminado de utilizar, se
     * implementa esta funcion con "async" para que nuestra conexion siempre
     * este atenta a las peticiones que se hagan y retorna la conexion.
     */

    createPool = async() => {
        // Se manejan las excepciones con un try/catch y si se logra la conexion se retorna la esta misma
        try {
            // Metodo de mysql2 para inicializar la conexion (Pool)
            const pool = await mysql.createPool({
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DATABASE
            });

            return pool;

        } catch (error) {
            console.log(error);
        }
    }


    /**
     * @function executeQuery(sql)
     * @param {String} sql 
     * @returns Promise
     * 
     * @example const db = new database();
     *
     * db.executeQuery('select * from Usuarios')
     *    .then(([rows, fields]) => {
     *       console.log(rows);
     *       db.releasePool();
     *    }).catch(err => {
     *       console.log(err);
     *    }); 
     * 
     * @description La funcion executeQuery(sql) servira para ejecutar las sentencias SQL que sean
     * necesarias se toma de parametro el atributo sql que sera un String que contenga la sentencia SQL
     */

    executeQuery = async(sql) => {
        // Se llama al metodo createPool() para establecer la conexion con la BD
        const pool = this.createPool();

        // Se controlan las exepciones y se manda a llamar la funcion para ejecutar la sentencia
        try {
            // Retornamos una promesa para poder utilizar nuestro resultado en cualquier otro
            // archivo y tambien manejar las excepciones que puedan llegar a existir
            return (await pool).promise().query(sql);

        } catch (error) {
            console.log(error);

        }
    }

    /**
     * @override
     * 
     * @function executeQuery(sql, inserts)
     * @param {String} sql 
     * @param {Array} inserts 
     * @returns Promise
     * 
     * @example const db = new database();
     * db.executeQuery('select * from Usuario where id = ?', [2])
     *  .then(([rows, fields]) => {
     *     console.log(rows);
     *     db.releasePool();
     *  }).catch(err => {
     *     console.log(err);
     *  });
     * 
     * @description Se sobreescribe la funcion executeQuery y se agrega otro argumento que servira para
     * utilizar "Prepared Statements" y que sea mas sencillo realizar las sentencias SQL
     */

    executeQuery = async(sql, inserts) => {
        // Se llama al metodo createPool() para establecer la conexion con la BD
        const pool = this.createPool();

        try {
            // Se retorna la promesa pero ahora se deberan incluir 2 argumentos
            return (await pool).promise().query(sql, inserts);

        } catch (error) {
            console.log(error);

        }
    }

    /**
     * @function releasePool()
     * 
     * @description El metodo releasePool() sirve para liberar la conexion (Pool) despues de ejecutar alguna sentencia
     * con el metodo executeQuery, siempre debera de ser ejecutada despues de terminar de ejecutar la sentencia SQL
     */

    releasePool = async() => {
        (await this.createPool()).getConnection((err, conn) => {
            if (err) throw err;

            conn.release();
            return;
        });
    }
}

// Se exporta la clase para que sea utilizada en otros archivos
module.exports = database;
