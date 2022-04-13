function seed(knex) {
    return knex('accounts').then(_ =>
        knex('accounts').insert([
            {
                username: 'marmag85',
                password: "$2a$12$A0HScvmVMgyRKcy/BYm/tuYi7IetjaYNpzU/gVHBmtHu3EtWUPshq",
            },
            {
                username: 'tenonaka',
                password: "$2a$12$A0HScvmVMgyRKcy/BYm/tuYi7IetjaYNpzU/gVHBmtHu3EtWUPshq",
            },
            {
                username: 'xX_matty_Xx',
                password: "$2a$12$A0HScvmVMgyRKcy/BYm/tuYi7IetjaYNpzU/gVHBmtHu3EtWUPshq",
            },
        ]));
}

module.exports = { seed }
