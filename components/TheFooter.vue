<template>
  <footer class="bg-white border-t border-red-100 mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <!-- Brand Info -->
        <div class="col-span-1 md:col-span-2">
          <NuxtLink
            to="/"
            class="flex items-center gap-3 mb-4 hover:bg-red-50 px-2 py-1 rounded transition"
            aria-label="Go to Homepage"
          >
            <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shadow-inner overflow-hidden">
              <img
                src="/icons/scooter.png"
                alt="ScootyLoot Logo"
                class="w-6 h-6 object-contain"
              />
            </div>
            <div class="leading-tight">
              <h2 class="text-xl font-extrabold tracking-wide text-gray-900">
                <span class="text-red-600">Scooty</span><span class="text-black">Loot</span>
              </h2>
              <p class="text-xs text-gray-500 font-medium mt-0.5">Quick. Tasty. Lootworthy.</p>
            </div>
          </NuxtLink>

          <p class="text-gray-700 text-sm leading-relaxed mb-6 max-w-md mt-2">
            Fast-track your cravings with Scooty Loot. Get groceries and daily essentials at lightning speed.
          </p>

          <div class="flex gap-4">
            <a href="#" aria-label="Facebook">
              <Icon name="simple-icons:facebook" class="w-5 h-5 text-gray-400 hover:text-red-600 transition" />
            </a>
            <a href="#" aria-label="Twitter">
              <Icon name="simple-icons:twitter" class="w-5 h-5 text-gray-400 hover:text-red-600 transition" />
            </a>
            <a href="#" aria-label="Instagram">
              <Icon name="simple-icons:instagram" class="w-5 h-5 text-gray-400 hover:text-red-600 transition" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold text-red-600 mb-4">Quick Links</h3>
          <ul class="space-y-3 text-sm text-gray-700">
            <li><NuxtLink to="/cms/about" class="hover:text-red-500 transition">About Us</NuxtLink></li>
            <li><NuxtLink to="/cms/how-it-works" class="hover:text-red-500 transition">How It Works</NuxtLink></li>
            <li><NuxtLink to="/cms/support" class="hover:text-red-500 transition">Support</NuxtLink></li>
          </ul>
        </div>

        <!-- Legal Links -->
        <div>
          <h3 class="text-lg font-semibold text-red-600 mb-4">Legal</h3>
          <ul class="space-y-3 text-sm text-gray-700">
            <li><NuxtLink to="/cms/terms-of-service" class="hover:text-red-500 transition">Terms of Service</NuxtLink></li>
            <li><NuxtLink to="/cms/privacy-policy" class="hover:text-red-500 transition">Privacy Policy</NuxtLink></li>
            <li><NuxtLink to="/cms/accessibility" class="hover:text-red-500 transition">Accessibility</NuxtLink></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-red-100 mt-10 pt-6 text-center">
        <p class="text-sm text-gray-500">&copy; 2025 Scooty Loot. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
