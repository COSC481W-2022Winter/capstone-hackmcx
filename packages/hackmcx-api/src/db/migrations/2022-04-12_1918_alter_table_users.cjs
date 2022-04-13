function up (knex) {
    return knex.schema
        .alterTable('users', function (table){
            table.dropColumn('imageUrl');
            table.text('imageData','longtext').notNullable().defaultTo('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');
        });
}

function down(knex){
    return knex.schema
        .alterTable('users', function (table){
            table.dropColumn('imageData');
            table.string('imageUrl', 2048).notNullable().defaultTo('https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png');
        });
}

module.exports = {
    up,
    down
}