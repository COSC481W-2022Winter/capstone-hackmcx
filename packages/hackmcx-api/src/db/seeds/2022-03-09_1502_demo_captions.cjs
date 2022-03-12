function seed(knex) {
    return knex('captions').then(_ =>
        knex('captions').insert([
            {
                id: 1,
                caption: 'Caption 1',
                post_id: 1,
                average_rating: 0.5,
                number_of_ratings: 2,
            },
            {
                id: 2,
                caption: 'Caption 2',
                post_id: 1,
                average_rating: 0.2,
                number_of_ratings: 100,
            },
            {
                id: 3,
                caption: 'Caption 3',
                post_id: 2,
                average_rating: 0.8,
                number_of_ratings: 5,
            },
            {
                id: 4,
                caption: 'Caption 4',
                post_id: 2,
                average_rating: 1.0,
                number_of_ratings: 2,
            },
            {
                id: 5,
                caption: 'Caption 5',
                post_id: 3,
                average_rating: 0.1,
                number_of_ratings: 10,
            },
            {
                id: 6,
                caption: 'Caption 6',
                post_id: 3,
                average_rating: 0.0,
                number_of_ratings: 2,
            },
        ]));
}

module.exports = { seed }