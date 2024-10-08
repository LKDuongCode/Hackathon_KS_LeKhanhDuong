<script setup lang="ts"></script>

<template>
  <div>
    <div class="flex justify-between">
      <h3>Categories Manager</h3>
      <div>
        <button class="bg-blue-400 rounded py-1 text-white">Add a new category</button>
      </div>
    </div>
    <hr class="border-[#444] border-solid" />
    <!-- table -->
    <div class="overflow-x-auto mt-5">
      <table class="min-w-full table-auto border-collapse border border-gray-300">
        <thead class="bg-[#444] text-white">
          <tr>
            <th class="border border-gray-300 px-4 py-2 text-left">STT</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Image</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Quantity</th>
            <th class="border border-gray-300 px-4 py-2 text-center">Options</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 px-4 py-2">1</td>
            <td class="border border-gray-300 px-4 py-2">
              <img src="https://via.placeholder.com/50" alt="product image" class="w-12 h-12" />
            </td>
            <td class="border border-gray-300 px-4 py-2">Category 1</td>
            <td class="border border-gray-300 px-4 py-2">100</td>
            <td class="border border-gray-300 px-4 py-2 text-center">
              <button
                class="rounded text-[#eee] text-sm font-semibold py-1 bg-blue-400 hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                class="rounded text-[#eee] text-sm font-semibold py-1 ml-2 bg-red-400 hover:bg-red-700"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
