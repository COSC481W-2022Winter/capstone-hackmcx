import './env.js'
import {dirname} from 'path'
import {fileURLToPath} from 'url'
import {app} from './app.js'
import {dbClient} from "./db/db.js";
import mysql from 'mysql2'

let port = process.env.PORT || 3003;

if (process.argv[2])
{
    if (process.argv[2] === '--migrate') {
        console.info("Running migrations!")
        
        const con = mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            });
        await con.promise().connect();
        // NOTE: Create database does not allow for parameterization of the database name for whatever reason.
        // Please do not ever interpolate a DB query string EVER as it leaves the app vulnerable to SQL injection
        // attacks.
        await con.promise().query(`create database if not exists ${process.env.DB_NAME}`);
        await con.promise().destroy();

        await dbClient.migrate.latest({ directory: dirname(fileURLToPath(import.meta.url))+'/db/migrations'})
            .then(([batchNo, log]) => {
                if (!log.length){
                    console.info('Database is up to date.')
                }else{
                    console.info(`Ran migrations : ${log.join(', ')}`)
                }
        });
        await dbClient.destroy()
    } else if (process.argv[2] === '--seed') {
        await dbClient.seed.run({directory: dirname(fileURLToPath(import.meta.url))+'/db/seeds'}).then(_ => {
            console.log("Seed data was applied.")
        });
        await dbClient.destroy();
    }
} else{
    app.listen(port, () => console.log(`'${process.env.NODE_ENV}' server  is running on port: '${port}'.`))
}
