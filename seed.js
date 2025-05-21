require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

async function seed() {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to DB for seeding');

    // Товари: букети, композиції, подарунки
    const items = [
        // Flowers
        {
            name: 'Червоні троянди',
            imageUrl: 'https://florella.com.ua/image/cache/catalog/2025%20che/IMG_2846-500x500.JPG',
            price: 499,
            category: 'Flowers',
            description: 'Букет з 11 червоних троянд',
        },
        {
            name: 'Білий лілії',
            imageUrl: 'https://florella.com.ua/image/cache/catalog/2024/IMG_9898-500x500.JPG',
            price: 549,
            category: 'Flowers',
            description: 'Елегантний букет з білих лілій',
        },
        {
            name: 'Піони рожеві',
            imageUrl: 'https://florella.com.ua/image/cache/catalog/2024/IMG_0039-500x500.JPG',
            price: 799,
            category: 'Flowers',
            description: 'Романтичний букет із ніжних рожевих півоній',
        },
        {
            name: 'Світ соняшників',
            imageUrl: 'https://florella.com.ua/image/cache/catalog/2025%20che/IMG_2835-500x500.JPG',
            price: 649,
            category: 'Flowers',
            description: 'Яскравий букет з 7 соняшників',
        },
        {
            name: 'Гаряча орхідея',
            imageUrl: 'https://florella.com.ua/image/cache/catalog/2025%20che/IMG_2835-500x500.JPG',
            price: 899,
            category: 'Flowers',
            description: 'Вишуканий букет із орхідей',
        },
        {
            name: 'Хризантеми осінні',
            imageUrl: 'https://florella.com.ua/image/cache/catalog/2025%20che/IMG_2858-500x500.JPG',
            price: 579,
            category: 'Flowers',
            description: 'Теплий букет із осінніх хризантем',
        },

        // Compositions
        {
            name: 'Весняна композиція',
            imageUrl: 'https://florella.com.ua/image/cache/catalog/2025%20che/IMG_2858-500x500.JPG',
            price: 699,
            category: 'Compositions',
            description: 'Яскрава композиція з тюльпанів і пролісків',
        },
        {
            name: 'Ранковий настрій',
            imageUrl: 'https://florella.com.ua/image/cache/catalog/2025%20che/IMG_2833-500x500.JPG',
            price: 749,
            category: 'Compositions',
            description: 'Легка композиція з польових квітів',
        },
        {
            name: 'Осіння симфонія',
            imageUrl: 'https://florella.com.ua/image/cache/catalog/2024/2024-02-13%2016.23.32-500x500.jpg',
            price: 699,
            category: 'Compositions',
            description: 'Теплі тони осінніх квітів',
        },
        {
            name: 'Тропічна фантазія',
            imageUrl: 'https://florella.com.ua/image/cache/catalog/2024/2024-02-13%2016.23.32-500x500.jpg',
            price: 999,
            category: 'Compositions',
            description: 'Яскрава суміш тропічних рослин',
        },

        // Gifts
        {
            name: 'Коробка з квітами та подарунком',
            imageUrl: 'https://florella.com.ua/image/cache/catalog/2025%20che/IMG_2846-500x500.JPG',
            price: 899,
            category: 'Gifts',
            description: 'Романтична коробка з квітами та шоколадом',
        },
        {
            name: 'Коробка троянд із кашеміром',
            imageUrl: 'https://florella.com.ua/image/cache/catalog/demo/1101-547x600-500x500.jpg',
            price: 1199,
            category: 'Gifts',
            description: 'Романтична коробка троянд зі шовковим шарфом',
        },
        {
            name: 'Шоколадне натхнення',
            imageUrl: 'https://florella.com.ua/image/cache/catalog/demo/1101-547x600-500x500.jpg',
            price: 799,
            category: 'Gifts',
            description: 'Набір елітного шоколаду та квітів',
        },
        {
            name: 'Свічка та квіти',
            imageUrl: 'https://florella.com.ua/image/cache/catalog/demo/1101-547x600-500x500.jpg',
            price: 849,
            category: 'Gifts',
            description: 'Романтична свічка в супроводі ніжних квітів',
        },
    ];

    await Product.deleteMany({});
    const inserted = await Product.insertMany(items);
    console.log(`Seeded ${inserted.length} products.`);
    await mongoose.disconnect();
}

seed().catch(err => console.error(err));
