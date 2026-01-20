<script setup></script>

<template>
  <div
    class="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 card-hover animate-pulse"
    v-for="i in 1"
    :key="i"
  >
    <div class="flex items-center mb-3">
      <div
        class="bg-gray-500 w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-md"
      >
        <i class="fas fa-home text-white"></i>
      </div>
      <div class="block w-[79%] h-6 antialiased bg-gray-500 rounded-full"></div>
    </div>
    <div class="space-y-3 text-gray-300 ml-2 mb-4">
      <p class="flex items-center">
        <i class="fas fa-road text-gray-500 w-6"></i>
        <span class="font-medium w-24">Street</span>
        <span class="mr-1">:</span>
        <span class="block w-[48%] h-5 antialiased bg-gray-500 rounded-full"></span>
      </p>
      <p class="flex items-center">
        <i class="fas fa-city text-gray-500 w-6"></i>
        <span class="font-medium w-24">City</span>
        <span class="mr-1">:</span>
        <span class="block w-[48%] h-5 antialiased bg-gray-500 rounded-full"></span>
      </p>
      <p class="flex items-center">
        <i class="fas fa-map text-gray-500 w-6"></i>
        <span class="font-medium w-24">Province</span>
        <span class="mr-1">:</span>
        <span class="block w-[48%] h-5 antialiased bg-gray-500 rounded-full"></span>
      </p>
      <p class="flex items-center">
        <i class="fas fa-flag text-gray-500 w-6"></i>
        <span class="font-medium w-24">Country</span>
        <span class="mr-1">:</span>
        <span class="block w-[48%] h-5 antialiased bg-gray-500 rounded-full"></span>
      </p>
      <p class="flex items-center">
        <i class="fa-solid fa-envelope text-gray-500 w-6"></i>
        <span class="font-medium w-24">Postal Code</span>
        <span class="mr-1">:</span>
        <span class="block w-[48%] h-5 antialiased bg-gray-500 rounded-full"></span>
      </p>
    </div>
    <div class="flex justify-end space-x-3">
      <button
        disabled
        class="px-4 py-2 bg-gradient opacity-50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center cursor-not-allowed"
      >
        <i class="fas fa-edit mr-2"></i> Edit
      </button>
      <button
        disabled
        class="px-4 py-2 bg-linear-to-r from-red-600 to-red-500 opacity-50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center cursor-not-allowed"
      >
        <i class="fas fa-trash-alt mr-2"></i> Delete
      </button>
    </div>
  </div>
</template>
