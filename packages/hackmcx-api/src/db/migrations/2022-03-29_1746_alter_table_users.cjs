function up (knex) {
    return knex.schema
        .alterTable('users', function (table){
            table.string('password', 72).notNullable();
        });
}

function down(knex){
    return knex.schema
        .alterTable('users', function (table){
            table.dropColumn('password');
        });
}

module.exports = {
    up,
    down
}