function seed(knex) {
    return knex('posts').then(_ =>
        knex('posts').insert([
            {
                id: 1,
                title: 'Workout',
                imageUrl: 'https://d2dcan0armyq93.cloudfront.net/photo/odai/600/33cec933411f70f658f5d904cb1f1d78_600.jpg',
            },
            {
                id: 2,
                title: 'Goku',
                imageUrl: 'https://d2dcan0armyq93.cloudfront.net/photo/odai/600/80d1ff581668d07b4617f336e73c81d3_600.jpg',
            },
            {
                id: 3,
                title: 'Math',
                imageUrl: 'https://d2dcan0armyq93.cloudfront.net/photo/odai/600/4749fd2ddd688fab3af563acf048c5e3_600.jpg',
            },
            {
                id: 4,
                title: 'Keyboard',
                imageUrl: 'https://d2dcan0armyq93.cloudfront.net/photo/odai/600/7b9c833a77028f36335739b5d2516601_600.jpg',
            },
            {
                id: 5,
                title: 'Beach Black and White',
                imageUrl: 'https://d2dcan0armyq93.cloudfront.net/photo/odai/600/b16c2289c81784050ac0b8f4ba70fa8f_600.jpg',
            },
            {
                id: 6,
                title: 'Old Waiter',
                imageUrl: 'https://d2dcan0armyq93.cloudfront.net/photo/odai/600/49c0fd0e29f84ef1309004bfd566c7c7_600.jpg',
            },
            {
                id: 7,
                title: 'Old Man in Tube',
                imageUrl: 'https://d2dcan0armyq93.cloudfront.net/photo/odai/600/7043551427252b37b1a2d0db9470b6b0_600.jpg',
            },
        ]));
}

module.exports = { seed }
