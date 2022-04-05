function seed(knex) {
    return knex('users').then(_ =>
        knex('users').insert([
            {
                username: 'marmag85',
                first_name: 'Marek',
                last_name: 'Magnolia',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/MJd1-.svg/100px-MJd1-.svg.png',
                password: "0",
            },
            {
                username: 'tenonaka',
                first_name: 'Kaiji',
                last_name: 'Itou',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/MJd2v1-.svg/100px-MJd2v1-.svg.png',
                password: "0",
            },
            {
                username: 'xX_matty_Xx',
                first_name: 'Matilda',
                last_name: 'Houston',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/MJd3e-.svg/100px-MJd3e-.svg.png',
                password: "0",
            },
        ]));
}

module.exports = { seed }
