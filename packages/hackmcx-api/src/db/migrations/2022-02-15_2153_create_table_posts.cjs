function up (knex) {
    return knex.schema
        .createTable('posts', function (table){
            table.increments('id')
            table.string('title', 255).notNullable();
            table.string('imageUrl', 2048).notNullable();
            table.timestamp('createdAt')
        });
}

function down(knex){
    return knex.schema.dropTable('posts')
}

module.exports = {
    up,
    down
}