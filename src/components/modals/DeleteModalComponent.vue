<script setup lang="ts">
import type { Product } from '@/interfaces/ProductType'
import { onMounted, reactive } from 'vue'

// truyền sự kiện đóng form
const emit = defineEmits(['close', 'delete'])
const handleClose = () => {
  emit('close', false)
}
const props = defineProps(['delete_product'])
//lấy đối tượng
const productDeleted = reactive<Product>({
  id: 0,
  name: '',
  price: 0,
  quantity: 0,
  img: ''
})

onMounted(() => {
  productDeleted.id = props.delete_product.id
  productDeleted.name = props.delete_product.name
  productDeleted.price = props.delete_product.price
  productDeleted.quantity = props.delete_product.quantity
  productDeleted.img = props.delete_product.img
})

const handleDelete = () => {
  emit('delete', productDeleted.id)
  handleClose()
}
</script>

<template>
  <div
    class="absolute h-screen w-screen bg-[#eeeeee30] top-0 left-0 flex justify-center items-center"
  >
    <div class="bg-[#666] w-96 p-5 rounded">
      <h3 class="text-left text-red-400">Delete warming</h3>
      <p>
        Are you sure you want to delete product
        <span class="text-white">"{{ productDeleted.name }}"</span>?
      </p>
      <hr class="border-[#999] border-solid my-4" />

      <div class="flex gap-5 justify-end">
        <button
          class="rounded text-sm font-semibold py-1 text-white bg-[#777]"
          @click="handleClose"
        >
          Cancel
        </button>
        <button
          class="rounded text-sm font-semibold py-1 text-white bg-red-400"
          @click="handleDelete"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
