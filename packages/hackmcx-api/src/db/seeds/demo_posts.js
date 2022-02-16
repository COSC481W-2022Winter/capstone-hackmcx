export function seed(knex) {
    return knex('posts').then(_ =>
        knex('posts').insert([
            {
                id: 1,
                title: 'Example 1',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Firefox_logo%2C_2019.svg/92px-Firefox_logo%2C_2019.svg.png',
                createdAt: 1
            },
            {
                id: 2,
                title: 'Example 2',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/96px-Google_Chrome_icon_%28February_2022%29.svg.png',
                createdAt: 3
            },
            {
                id: 3,
                title: 'Example 3',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/71/Safari_14_icon.png/96px-Safari_14_icon.png',
                createdAt: 5
            }
        ]));
}