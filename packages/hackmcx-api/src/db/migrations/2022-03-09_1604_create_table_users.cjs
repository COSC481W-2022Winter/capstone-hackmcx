function up (knex) {
    return knex.schema
        .createTable('users', function (table){
            table.string('username', 255).primary().notNullable();
            table.string('first_name', 255).notNullable();
            table.string('last_name', 255).notNullable();
            table.string('imageUrl', 2048).notNullable();
            table.boolean('disable').defaultTo(false);
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