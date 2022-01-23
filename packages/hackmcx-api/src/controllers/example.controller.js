import {pool} from '../clients/mariadb.js'

export async function getExample(req, res){
    pool.getConnection().then(connection => {
        connection.query('SELECT CURRENT_TIMESTAMP;')
            .then((response) => {
                res.send(response)
            })
        connection.release()
        }
    );
}