function up (knex) {
    return knex.schema
        .alterTable('posts', function (table){
            table.dropColumn('imageUrl');
            table.text('imageData','longtext').notNullable();
        });
}

function down(knex){
    return knex.schema
        .alterTable('users', function (table){
            table.dropColumn('imageData');
            table.string('imageUrl', 2048).notNullable();
        });
}

module.exports = {
    up,
    down
}