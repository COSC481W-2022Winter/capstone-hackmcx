function seed(knex) {
    return knex('users').then(_ =>
        knex('users').insert([
            {
                username: 'username1',
                first_name: 'first_name1',
                last_name: 'last_name1',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/MJd1-.svg/100px-MJd1-.svg.png',
            },
            {
                username: 'username2',
                first_name: 'first_name2',
                last_name: 'last_name2',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/MJd2v1-.svg/100px-MJd2v1-.svg.png',
            },
            {
                username: 'username3',
                first_name: 'first_name3',
                last_name: 'last_name3',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/MJd3e-.svg/100px-MJd3e-.svg.png',
            },
        ]));
}

module.exports = { seed }
