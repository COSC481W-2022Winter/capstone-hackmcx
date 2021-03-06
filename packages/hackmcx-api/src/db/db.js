import knex from "knex";

export const dbClient = knex({
    client: "mysql2",
    connection:{
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    },
    pool: {
        min: 0,
        max : process.env.DB_POOL_MAX
    }
});