import './env.js'
import {dirname} from 'path'
import {fileURLToPath} from 'url'
import {app} from './app.js'
import {dbClient} from "./db/db.js";

let port = process.env.PORT || 3003;

if (process.argv[2])
{
    if (process.argv[2] === '--migrate') {
        console.info("Running migrations!")
        await dbClient.migrate.latest({ directory: dirname(fileURLToPath(import.meta.url))+'/db/migrations'})
            .then(([batchNo, log]) => {
                if (!log.length){
                    console.info('Database is up to date.')
                }else{
                    console.info(`Ran migrations : ${log.join(', ')}`)
                }
        });
        dbClient.destroy().then()
    } else if (process.argv[2] === '--seed') {
        // TODO: Call seed here.
    }
} else{
    app.listen(port, () => console.log(`'${process.env.NODE_ENV}' server  is running on port: '${port}'.`))
}
