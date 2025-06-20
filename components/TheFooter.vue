<template>
  <footer class="bg-white border-t border-red-100 mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
        <!-- Brand Info -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-md">
              <Icon name="heroicons:truck" class="w-6 h-6 text-white" />
            </div>
            <h2 class="text-2xl font-extrabold text-red-600 tracking-tight">Scooty Loot</h2>
          </div>
          <p class="text-gray-700 text-sm leading-relaxed mb-6 max-w-md">
            Fast-track your cravings with Scooty Loot. Get groceries and daily essentials at lightning speed.
          </p>
          <div class="flex gap-4">
            <Icon name="simple-icons:facebook"
              class="w-5 h-5 text-gray-400 hover:text-red-600 transition-colors duration-300" />
            <Icon name="simple-icons:twitter"
              class="w-5 h-5 text-gray-400 hover:text-red-600 transition-colors duration-300" />
            <Icon name="simple-icons:instagram"
              class="w-5 h-5 text-gray-400 hover:text-red-600 transition-colors duration-300" />
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold text-red-600 mb-4">Quick Links</h3>
          <ul class="space-y-3 text-sm text-gray-700">
            <li class="hover:text-red-500 transition duration-200">About Us</li>
            <li class="hover:text-red-500 transition duration-200">How It Works</li>
            <li class="hover:text-red-500 transition duration-200">Support</li>
          </ul>
        </div>

        <!-- Legal Links -->
        <div>
          <h3 class="text-lg font-semibold text-red-600 mb-4">Legal</h3>
          <ul class="space-y-3 text-sm text-gray-700">
            <li class="hover:text-red-500 transition duration-200">Terms of Service</li>
            <li class="hover:text-red-500 transition duration-200">Privacy Policy</li>
            <li class="hover:text-red-500 transition duration-200">Cookie Policy</li>
            <li class="hover:text-red-500 transition duration-200">Accessibility</li>
          </ul>
        </div>
      </div>

      <div class="border-t border-red-100 mt-10 pt-6 text-center">
        <p class="text-sm text-gray-500">&copy; 2025 Scooty Loot. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
