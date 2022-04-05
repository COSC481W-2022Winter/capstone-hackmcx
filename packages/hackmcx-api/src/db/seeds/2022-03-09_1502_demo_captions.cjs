function seed(knex) {
    return knex('captions').then(_ =>
        knex('captions').insert([
            {
                id: 1,
                caption: 'The last drop of a shampoo bottle',
                post_id: 1,
                average_rating: 0.9,
                number_of_ratings: 180,
            },
            {
                id: 2,
                caption: 'Trying to open a pickle jar',
                post_id: 1,
                average_rating: 0.7,
                number_of_ratings: 100,
            },
            {
                id: 3,
                caption: 'Expert level cocktail mixing',
                post_id: 1,
                average_rating: 0.5,
                number_of_ratings: 5,
            },
            {
                id: 4,
                caption: 'Abandoned at a laundromat',
                post_id: 2,
                average_rating: 1.0,
                number_of_ratings: 2,
            },
            {
                id: 5,
                caption: 'Wife: "you do know what today is, right?"',
                post_id: 3,
                average_rating: 0.9,
                number_of_ratings: 10,
            },
            {
                id: 6,
                caption: '1+1=?',
                post_id: 3,
                average_rating: 0.2,
                number_of_ratings: 2,
            },
            {
                id: 7,
                caption: 'dtapjtduasmwdtatdjdata1abatdapjdtajujtgjgc5k',
                post_id: 4,
                average_rating: 0.8,
                number_of_ratings: 20,
            },
            {
                id: 8,
                caption: 'UFO successfully captured',
                post_id: 5,
                average_rating: 0.9,
                number_of_ratings: 21,
            },
            {
                id: 9,
                caption: 'Me on the left',
                post_id: 5,
                average_rating: 0.6,
                number_of_ratings: 61,
            },
            {
                id: 10,
                caption: 'No thanks',
                post_id: 6,
                average_rating: 1.0,
                number_of_ratings: 15,
            },
            {
                id: 11,
                caption: 'Another earthquake today...',
                post_id: 6,
                average_rating: 0.5,
                number_of_ratings: 22,
            },
            {
                id: 12,
                caption: 'Hide and Seek Guinness World Record: 60 years, 265 days',
                post_id: 7,
                average_rating: 1.0,
                number_of_ratings: 46,
            },
            {
                id: 13,
                caption: 'It\'s too late for me. Save yourself.',
                post_id: 7,
                average_rating: 0.6,
                number_of_ratings: 20,
            },
        ]));
}

module.exports = { seed }
