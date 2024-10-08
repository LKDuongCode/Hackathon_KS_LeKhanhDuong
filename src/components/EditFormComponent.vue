<script setup lang="ts">
import type { Product } from '@/interfaces/ProductType'
import { validateProductName } from '@/utils/existName'
import { onMounted, reactive } from 'vue'

// truyền sự kiện đóng form
const emit = defineEmits(['close', 'edit'])
const handleClose = () => {
  emit('close', false)
}
const props = defineProps(['edit_product'])
//lấy đối tượng
const editAProduct = reactive<Product>({
  id: 0,
  name: '',
  price: 0,
  quantity: 0,
  img: ''
})

//biến lưu trữ giá trị tên cũ
let oldName: string = ''

// lấy data local
const productList = reactive<Product[]>([])

onMounted(() => {
  const storedProducts = localStorage.getItem('products')
  if (storedProducts) {
    const parsedProducts = JSON.parse(storedProducts)
    productList.push(...parsedProducts)
  }
  editAProduct.id = props.edit_product.id
  editAProduct.name = props.edit_product.name
  oldName = props.edit_product.name
  editAProduct.price = props.edit_product.price
  editAProduct.quantity = props.edit_product.quantity
  editAProduct.img = props.edit_product.img
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

const handleEdit = () => {
  if (editAProduct.name === '' || editAProduct.img === '') {
    validate.empty = true
    return
  }
  if (editAProduct.price < 10) {
    validate.minPrice = true
    return
  }
  if (editAProduct.quantity < 1 || editAProduct.quantity > 100) {
    validate.quantityLimited = true
    return
  }
  if (validateProductName(productList, editAProduct.name, 'edit', oldName)) {
    validate.existName = true
    return
  }

  //tìm đối tượng cần chỉnh
  const index = productList.findIndex((product) => product.id === editAProduct.id)
  if (index !== -1) {
    productList[index] = { ...editAProduct }
    localStorage.setItem('products', JSON.stringify(productList))

    emit('edit', editAProduct)

    handleClose()
  } else {
    console.error('Product not found!')
  }
}
</script>

<template>
  <div
    class="absolute h-screen w-screen bg-[#eeeeee30] top-0 left-0 flex justify-center items-center"
  >
    <div class="bg-[#666] w-96 p-5 rounded">
      <h3 class="text-center text-green-300">Edit a product</h3>
      <hr />
      <div class="flex flex-col gap-4 mt-3">
        <div>
          <p class="text-white font-semibold">Name</p>
          <input
            type="text"
            class="w-full mt-1 px-3 py-1 rounded"
            @click="handleFocus"
            v-model="editAProduct.name"
          />
        </div>
        <div>
          <p class="text-white font-semibold">Image</p>
          <input
            type="text"
            class="w-full mt-1 px-3 py-1 rounded"
            @click="handleFocus"
            v-model="editAProduct.img"
          />
        </div>
        <div>
          <p class="text-white font-semibold">Price</p>
          <input
            type="number"
            class="w-full mt-1 px-3 py-1 rounded"
            @click="handleFocus"
            v-model="editAProduct.price"
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
            v-model="editAProduct.quantity"
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
            class="rounded text-sm font-semibold py-1 text-white bg-green-400"
            @click="handleEdit"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
