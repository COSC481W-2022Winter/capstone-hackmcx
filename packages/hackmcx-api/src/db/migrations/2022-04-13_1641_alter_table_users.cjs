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
            table.string('password', 72).notNullable();
            table.boolean('disable').defaultTo(false);
        });
}

module.exports = {
    up,
    down
}
