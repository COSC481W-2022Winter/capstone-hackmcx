function up (knex) {
    return knex.schema
        .createTable('users', function (table){
            table.string('username', 255).primary();
            table.string('first_name', 255);
            table.string('last_name', 255);
            table.timestamp('createdAt')
        });
}

function down(knex){
    return knex.schema.dropTable('users')
}

module.exports = {
    up,
    down
}