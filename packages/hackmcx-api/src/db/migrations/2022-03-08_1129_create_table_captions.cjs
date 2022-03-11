function up (knex) {
    return knex.schema
        .createTable('captions', function (table){
            table.increments('id');
            table.string('caption', 2048).notNullable();
            table.integer('post_id').unsigned().notNullable();
            table.foreign('post_id').references('id').inTable('posts').onDelete('cascade');
            table.double('average_rating');
            table.integer('number_of_ratings');
            table.timestamp('createdAt');
        });
}

function down(knex){
    return knex.schema.dropTable('captions')
}

module.exports = {
    up,
    down
}