function up (knex) {
    return knex.schema
        .createTable('users', function (table){
            table.string('username', 255).primary();
            table.string('first_name', 255);
            table.string('last_name', 255);
            table.string('imageUrl', 2048).notNullable().defaultTo('https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png');
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
