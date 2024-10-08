import type { Product } from '@/interfaces/ProductType'

const products: Product[] = [
  {
    id: 1,
    name: 'Orange',
    price: 100,
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Ambersweet_oranges.jpg/800px-Ambersweet_oranges.jpg',
    quantity: 10
  },
  {
    id: 2,
    name: 'Smart Phone',
    price: 1500,
    img: 'https://cdn.thewirecutter.com/wp-content/media/2024/03/androidphones-2048px-0803.jpg',
    quantity: 20
  },
  {
    id: 3,
    name: 'Banana',
    price: 200,
    img: 'https://cdn-prod.medicalnewstoday.com/content/images/articles/271/271157/bananas-chopped-up-in-a-bowl.jpg',
    quantity: 30
  },
  {
    id: 4,
    name: 'Pork',
    price: 250,
    img: 'https://img.taste.com.au/-firTHFw/taste/2023/03/glazed-pork-belly-185799-1.jpg',
    quantity: 40
  },
  {
    id: 5,
    name: 'Watermelon',
    price: 300,
    img: 'https://hips.hearstapps.com/hmg-prod/images/fresh-ripe-watermelon-slices-on-wooden-table-royalty-free-image-1684966820.jpg',
    quantity: 50
  }
]

localStorage.setItem('products', JSON.stringify(products))
