export function up(knex) {
    return knex.schema.createSchemaIfNotExists('app')
}

export function down(knex){
    return knex.schema.dropSchema('app');
}