<script setup lang="ts">
import AddFormComponent from '@/components/AddFormComponent.vue'
import EditFormComponent from '@/components/EditFormComponent.vue'
import DeleteModalComponent from '@/components/modals/DeleteModalComponent.vue'
import type { Product } from '@/interfaces/ProductType'
import { computed, onMounted, reactive, ref } from 'vue'

// đóng mở form add----------------------------------------------
const isAdding = ref<boolean>(false)
const getCloseAdd = (close: boolean) => {
  isAdding.value = close
}

//lấy data
const productList = reactive<Product[]>([])
onMounted(() => {
  const storedProducts = localStorage.getItem('products')
  if (storedProducts) {
    const parsedProducts = JSON.parse(storedProducts)
    productList.push(...parsedProducts)
  }
  // Tự động focus vào input
  searchInputRef.value?.focus()
})
//cập nhật giao diện sau khi thêm
const getNewProduct = (product: Product) => {
  productList.push({ ...product })
}

// đống mở form edit--------------------------------------------
const isEdit = ref<boolean>(false)
const getCloseEdit = (close: boolean) => {
  isEdit.value = close
}
//truyền props
const editProduct = ref()
const openEdit = (product: Product) => {
  editProduct.value = product
  isEdit.value = true
}
//cập nhật giao diện sau khi edit
const getEditProduct = (updatedProduct: Product) => {
  const index = productList.findIndex((prod) => prod.id === updatedProduct.id)
  if (index !== -1) {
    productList[index] = { ...updatedProduct }
  }
}

//xóa-----------------------------------------------------
const isDelete = ref<boolean>(false)
const getCloseDelete = (close: boolean) => {
  isDelete.value = close
}
//truyền props
const deleteProduct = ref()
const openDelete = (product: Product) => {
  deleteProduct.value = product
  isDelete.value = true
}

const getDeleteID = (id: number) => {
  const index = productList.findIndex((product) => product.id === id)
  if (index !== -1) {
    productList.splice(index, 1)
    localStorage.setItem('products', JSON.stringify(productList))
  } else {
    console.log(`Product with id ${id} not found.`)
  }
}

//tìm kiếm
const searchKeyword = ref<string>('')
const searchInputRef = ref<HTMLInputElement | null>(null) //focus

const filteredProducts = computed(() => {
  if (!searchKeyword.value.trim()) {
    return productList
  }
  return productList.filter((product) =>
    product.name.toLowerCase().includes(searchKeyword.value.toLowerCase())
  )
})
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <h3>Products Manager</h3>
      <div class="flex">
        <input
          ref="searchInputRef"
          v-model="searchKeyword"
          type="text"
          class="w-96 px-2 py-1 rounded"
          placeholder="Search for a product..."
        />
      </div>
      <div>
        <button class="bg-blue-400 rounded py-1 text-white" @click="() => (isAdding = true)">
          Add a new product
        </button>
      </div>
    </div>
    <hr class="border-[#444] border-solid my-5" />
    <!-- table -->
    <div class="overflow-x-auto mt-5">
      <table class="min-w-full table-auto border-collapse border border-gray-300">
        <thead class="bg-[#444] text-white">
          <tr>
            <th class="border border-gray-300 px-4 py-2 text-left">STT</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Image</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Price</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Quantity</th>
            <th class="border border-gray-300 px-4 py-2 text-center">Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in filteredProducts" :key="product.id">
            <td class="border border-gray-300 px-4 py-2">{{ index + 1 }}</td>
            <td class="border border-gray-300 px-4 py-2">
              <img :src="product.img" alt="product image" class="w-12 h-12" />
            </td>
            <td class="border border-gray-300 px-4 py-2">{{ product.name }}</td>
            <td class="border border-gray-300 px-4 py-2">${{ product.price }}</td>
            <td class="border border-gray-300 px-4 py-2">${{ product.quantity }}</td>
            <td class="border border-gray-300 px-4 py-2 text-center">
              <button
                class="rounded text-[#eee] text-sm font-semibold py-1 bg-amber-400 hover:bg-amber-700"
                @click="openEdit(product)"
              >
                Edit
              </button>
              <button
                class="rounded text-[#eee] text-sm font-semibold py-1 ml-2 bg-red-400 hover:bg-red-700"
                @click="openDelete(product)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- form add -->
  <div v-if="isAdding">
    <AddFormComponent @close="getCloseAdd" @add="getNewProduct"> </AddFormComponent>
  </div>
  <div v-if="isEdit">
    <EditFormComponent
      @close="getCloseEdit"
      :edit_product="editProduct"
      @edit="getEditProduct"
    ></EditFormComponent>
  </div>
  <div v-if="isDelete">
    <DeleteModalComponent
      @close="getCloseDelete"
      :delete_product="deleteProduct"
      @delete="getDeleteID"
    ></DeleteModalComponent>
  </div>
</template>

<style scoped></style>
