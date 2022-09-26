<script setup>
import { useStore } from "../store/index"

const store = useStore()

defineProps({
  id: ''
})

// toggle favorite projects - check if selected project is already in favorites: add if it isn't and remove if it is
const addToFavorite = (id) => {
!store.favoriteArray.includes(id) ? store.favoriteArray.push(id) : store.favoriteArray.splice(store.favoriteArray.indexOf(id), 1)
localStorage.setItem('top1000-favorite', store.favoriteArray)
}
</script>

<template>
  <div class="h-8 w-8 bg-white border border-black rounded-full top-2 right-1 z-10 grid place-content-center cursor-pointer hover:transition hover:ease-in-out hover:scale-125 hover:duration-500" @click="addToFavorite(id)">
    <svg v-if="store.favoriteArray.includes(id)" xmlns="http://www.w3.org/2000/svg" fill="#CFFFF6" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 animate-ping-once">
      <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:scale-110 animate-ping-once">
      <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  </div>
</template>
