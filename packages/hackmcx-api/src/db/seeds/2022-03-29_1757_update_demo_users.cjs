function seed(knex) {
    return knex('users').update('password', '$2a$12$A0HScvmVMgyRKcy/BYm/tuYi7IetjaYNpzU/gVHBmtHu3EtWUPshq');
}

module.exports = { seed }
