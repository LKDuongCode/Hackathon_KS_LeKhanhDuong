import type { Product } from '@/interfaces/ProductType'

export const findProductById = (products: Product[], id: number): Product => {
  const foundProduct = products.find((p) => p.id === id)

  if (foundProduct) {
    return foundProduct
  }

  // Nếu không tìm thấy, trả về đối tượng rỗng
  return {
    id: 0,
    name: '',
    price: 0,
    quantity: 0,
    img: ''
  }
}
