import { Product } from "./types/product"

export const PRODUCTS: Product[] = [
  {
     id: 1,
     title: "MacBook-pro-2024",
     slug:"MacBook-pro-2024",
     heroImage: require('../assets/images/mac-book-1.jpg'),
     imagesUrl: [
      require('../assets/images/mac-book-1.jpg'),
      require('../assets/images/mac-book-2.jpg'),
      require('../assets/images/mac-book-3.jpg'),
     ],
     price: 899.99,
     category: {
      imageUrl: require('../assets/images/mac-book-1.jpg'),
      name: 'Laptops',
      slug: 'laptops',
     },
     maxQuantity: 5,
},
{
  id: 2,
  title: "Dell XPS 13",
  slug:"Dell XPS 13",
  heroImage: require('../assets/images/dell-1.jpg'),
  imagesUrl: [
   require('../assets/images/dell-1.jpg'),
   require('../assets/images/dell-2.jpg'),
  ],
  price: 899.99,
  category: {
   imageUrl: require('../assets/images/dell-1.jpg'),
   name: 'Laptops',
   slug: 'laptops',
  },
  maxQuantity: 5,
},
{
  id: 3,
  title: "MacBook-pro-2024",
  slug:"MacBook-pro-2024",
  heroImage: require('../assets/images/head-set-1.jpg'),
  imagesUrl: [
   require('../assets/images/head-set-1.jpg'),
   require('../assets/images/head-set-2.jpg'),
  ],
  price: 899.99,
  category: {
   imageUrl: require('../assets/images/head-set-1.jpg'),
   name: 'Laptops',
   slug: 'laptops',
  },
  maxQuantity: 5,
},
{
  id: 4,
  title: "ps-5",
  slug:"ps-5",
  heroImage: require('../assets/images/ps-5-1.jpg'),
  imagesUrl: [
   require('../assets/images/ps-5-1.jpg'),
   require('../assets/images/ps-5-2.jpg'),
   require('../assets/images/ps-5-3.jpg'),
  ],
  price: 899.99,
  category: {
   imageUrl: require('../assets/images/ps-5-1.jpg'),
   name: 'Laptops',
   slug: 'laptops',
  },
  maxQuantity: 5,
},
{
  id: 5,
  title: "samsung",
  slug:"samsung",
  heroImage: require('../assets/images/samsung-1.jpg'),
  imagesUrl: [
   require('../assets/images/samsung-1.jpg'),
   require('../assets/images/samsung-2.jpg'),
  ],
  price: 899.99,
  category: {
   imageUrl: require('../assets/images/samsung-1.jpg'),
   name: 'Laptops',
   slug: 'laptops',
  },
  maxQuantity: 5,
},
{
  id: 6,
  title: "nintendo-switch",
  slug:"samsung",
  heroImage: require('../assets/images/nintendo-switch-1.jpg'),
  imagesUrl: [
   require('../assets/images/nintendo-switch-1.jpg'),
   require('../assets/images/nintendo-switch-2.jpg'),
  ],
  price: 899.99,
  category: {
   imageUrl: require('../assets/images/nintendo-switch-1.jpg'),
   name: 'Laptops',
   slug: 'laptops',
  },
  maxQuantity: 5,
},
{
  id: 7,
  title: "i-phone",
  slug:"i-phone",
  heroImage: require('../assets/images/i-phone-1.jpg'),
  imagesUrl: [
   require('../assets/images/i-phone-1.jpg'),
   require('../assets/images/i-phone-2.jpg'),
   require('../assets/images/i-phone-3.jpg'),
  ],
  price: 899.99,
  category: {
   imageUrl: require('../assets/images/i-phone-1.jpg'),
   name: 'Laptops',
   slug: 'laptops',
  },
  maxQuantity: 5,
}
]




