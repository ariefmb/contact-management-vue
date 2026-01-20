<script setup></script>

<template>
  <div
    class="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in"
    v-for="i in 2"
    :key="i"
  >
    <div class="p-6">
      <div class="block rounded-lg transition-all duration-200 p-3 animate-pulse">
        <div class="flex items-center mb-3">
          <div
            class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md"
          >
            <i class="fas fa-user text-white"></i>
          </div>
          <div class="block w-[85%] h-6 antialiased bg-gray-500 rounded-full"></div>
        </div>
        <div class="space-y-3 text-gray-300 ml-2">
          <p class="flex items-center gap-1.5">
            <i class="fas fa-user-tag text-gray-500 w-6"></i>
            <span class="font-medium w-24">First Name</span>
            <span>:</span>
            <span class="block w-[62%] h-5 antialiased bg-gray-500 rounded-full"></span>
          </p>
          <p class="flex items-center gap-1.5">
            <i class="fas fa-user-tag text-gray-500 w-6"></i>
            <span class="font-medium w-24">Last Name</span>
            <span>:</span>
            <span class="block w-[62%] h-5 antialiased bg-gray-500 rounded-full"></span>
          </p>
          <p class="flex items-center gap-1.5">
            <i class="fas fa-envelope text-gray-500 w-6"></i>
            <span class="font-medium w-24">Email</span>
            <span>:</span>
            <span class="block w-[62%] h-5 antialiased bg-gray-500 rounded-full"></span>
          </p>
          <p class="flex items-center gap-1.5">
            <i class="fas fa-phone text-gray-500 w-6"></i>
            <span class="font-medium w-24">Phone</span>
            <span>:</span>
            <span class="block w-[62%] h-5 antialiased bg-gray-500 rounded-full"></span>
          </p>
        </div>
      </div>
      <div class="mt-4 flex justify-end space-x-3">
        <button
          class="px-4 py-2 bg-gradient opacity-50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center cursor-not-allowed"
          disabled
        >
          <i class="fas fa-edit mr-2"></i> Edit
        </button>
        <button
          class="px-4 py-2 bg-linear-to-r from-red-600 to-red-500 opacity-50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center cursor-not-allowed"
          disabled
        >
          <i class="fas fa-trash-alt mr-2"></i> Delete
        </button>
      </div>
    </div>
  </div>
</template>
