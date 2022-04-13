function up (knex) {
    return knex.schema
        .alterTable('users', function (table){
            table.dropColumn('password');
            table.dropColumn('disable');
        });
}

function down(knex){
    return knex.schema
        .alterTable('users', function (table){
            table.string('username', 255).primary();
            table.string('password', 72).notNullable();
        });
}

module.exports = {
    up,
    down
}
