function up (knex) {
    return knex.schema
        .createTable( 'accounts', function (table) {
            table.string('username', 255).primary();
            table.string('password', 72).notNullable();
            table.boolean('disable').defaultTo(false);
            table.timestamp('createdAt');
        });
}

function down (knex) {
    return knex.schema.dropTable('accounts');
}

module.exports = {
    up,
    down
}
