<script setup lang="ts">
import type { Product } from '@/interfaces/ProductType'
import { validateProductName } from '@/utils/existName'

import { onMounted, reactive } from 'vue'

// truyền sự kiện đóng form
const emit = defineEmits(['close', 'add'])
const handleClose = () => {
  autoClearInfo()
  emit('close', false)
}

// lấy data local
const productList = reactive<Product[]>([])
onMounted(() => {
  const storedProducts = localStorage.getItem('products')
  if (storedProducts) {
    const parsedProducts = JSON.parse(storedProducts)
    productList.push(...parsedProducts)
  }
})

//validate
const validate = reactive({
  empty: false,
  minPrice: false,
  quantityLimited: false,
  existName: false
})
// ẩn thông báo khi foccus
const handleFocus = () => {
  validate.empty = false
  validate.minPrice = false
  validate.quantityLimited = false
  validate.existName = false
}

//lấy đối tượng từ người dùng
const createAproduct = reactive<Product>({
  id: Math.floor(Math.random() * 999999),
  name: '',
  price: 0,
  quantity: 0,
  img: ''
})

//nút thêm mới
const handleAdd = () => {
  if (createAproduct.name === '' || createAproduct.img === '') {
    validate.empty = true
    return
  }
  if (createAproduct.price < 10) {
    validate.minPrice = true
    return
  }
  if (createAproduct.quantity < 1 || createAproduct.quantity > 100) {
    validate.quantityLimited = true
    return
  }
  if (validateProductName(productList, createAproduct.name, 'add')) {
    validate.existName = true
    return
  }
  productList.push({ ...createAproduct })
  localStorage.setItem('products', JSON.stringify(productList))
  //phát sự kiện đến cha sau khi thêm xong
  emit('add', createAproduct)
  autoClearInfo()
  handleClose()
}

//hàm clear đối tương sau khi đóng form
const autoClearInfo = () => {
  createAproduct.id = Math.floor(Math.random() * 999999)
  createAproduct.name = ''
  createAproduct.price = 0
  createAproduct.quantity = 0
  createAproduct.img = ''
}
</script>

<template>
  <div
    class="absolute h-screen w-screen bg-[#eeeeee30] top-0 left-0 flex justify-center items-center"
  >
    <div class="bg-[#666] w-96 p-5 rounded">
      <h3 class="text-center text-blue-300">Add a new product</h3>
      <hr />
      <div class="flex flex-col gap-4 mt-3">
        <div>
          <p class="text-white font-semibold">Name</p>
          <input
            type="text"
            class="w-full mt-1 px-3 py-1 rounded"
            v-model="createAproduct.name"
            @click="handleFocus"
          />
        </div>
        <div>
          <p class="text-white font-semibold">Image</p>
          <input
            type="text"
            class="w-full mt-1 px-3 py-1 rounded"
            v-model="createAproduct.img"
            @click="handleFocus"
          />
        </div>
        <div>
          <p class="text-white font-semibold">Price</p>
          <input
            type="number"
            class="w-full mt-1 px-3 py-1 rounded"
            v-model="createAproduct.price"
            @click="handleFocus"
            min="10"
          />
        </div>
        <div>
          <p class="text-white font-semibold">Quantity</p>
          <input
            type="number"
            min="1"
            max="100"
            class="w-full mt-1 px-3 py-1 rounded"
            v-model="createAproduct.quantity"
            @click="handleFocus"
          />
        </div>
        <!-- validate -->
        <div>
          <p v-show="validate.empty" class="text-red-500 bg-red-100 px-3 text-sm font-medium">
            Data fields cannot be left blank!
          </p>
          <p v-show="validate.existName" class="text-red-500 bg-red-100 px-3 text-sm font-medium">
            Product name already exists!
          </p>
          <p v-show="validate.minPrice" class="text-red-500 bg-red-100 px-3 text-sm font-medium">
            Minimum price is $10!
          </p>
          <p
            v-show="validate.quantityLimited"
            class="text-red-500 bg-red-100 px-3 text-sm font-medium"
          >
            Minimum quantity is 1 and maximum is 100!
          </p>
        </div>
        <div class="flex gap-5 justify-end">
          <button
            class="rounded text-sm font-semibold py-1 text-white bg-[#777]"
            @click="handleClose"
          >
            Cancel
          </button>
          <button
            class="rounded text-sm font-semibold py-1 text-white bg-blue-400"
            @click="handleAdd"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
