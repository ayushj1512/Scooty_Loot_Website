<template>
  <aside
    class="fixed top-0 left-0 w-56 bg-white shadow-xl border-r z-50 flex flex-col"
    style="height: 100dvh;"  <!-- ensures full height on mobile -->
  >
    <!-- Logo -->
    <div class="p-5 border-b flex items-center space-x-3">
      <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shadow-inner">
        <div class="text-2xl">🛵</div>
      </div>
      <div class="leading-tight">
        <h1 class="text-xl font-extrabold tracking-wide text-gray-900 whitespace-nowrap">
          <span class="text-red-600">Scooty</span>
          <span class="text-black">Loot</span>
        </h1>
        <p class="text-[11px] text-gray-500 font-medium tracking-wide mt-0.5 whitespace-nowrap">
          Quick. Tasty. Lootworthy.
        </p>
      </div>
    </div>

    <!-- Navigation (Scrollable if overflow) -->
    <nav class="flex flex-col p-4 space-y-2 mt-4 overflow-y-auto">
      <NuxtLink to="/" class="nav-link group">
        <span class="label group-hover:text-red-600">Home</span>
        <span class="emoji">🏠</span>
      </NuxtLink>
      <NuxtLink to="/grocery" class="nav-link group">
        <span class="label group-hover:text-red-600">Grocery</span>
        <span class="emoji">🛒</span>
      </NuxtLink>
      <NuxtLink to="/fashion" class="nav-link group">
        <span class="label group-hover:text-red-600">Fashion</span>
        <span class="emoji">👗</span>
      </NuxtLink>
      <NuxtLink to="/food" class="nav-link group">
        <span class="label group-hover:text-red-600">Food</span>
        <span class="emoji">🍔</span>
      </NuxtLink>
      <NuxtLink to="/jewellery" class="nav-link group">
        <span class="label group-hover:text-red-600">Jewellery</span>
        <span class="emoji">💍</span>
      </NuxtLink>
    </nav>
  </aside>
</template>

