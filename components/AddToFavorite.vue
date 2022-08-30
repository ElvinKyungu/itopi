<script setup>
import { useStore } from "../store/index"

const store = useStore()

defineProps({
  id: ''
})

// toggle favorite projects - check if selected project is already in favorites: add if it isn't and remove if it is
const addToFavorite = (id) => {
!store.favoriteArray.includes(id) ? store.favoriteArray.push(id) : store.favoriteArray.splice(store.favoriteArray.indexOf(id), 1)
}
</script>

<template>
  <div class="h-6 w-6 bg-white border border-black rounded-full absolute top-2 right-1 z-20 grid place-content-center" @click="addToFavorite(id)">
    <span v-if="store.favoriteArray.includes(id)" class="material-symbols-outlined font-thin text-xl icone-fill cursor-pointer">grade</span>
    <span v-else class="material-symbols-outlined font-thin text-3xl cursor-pointer">grade</span>
  </div>
</template>

<style>

</style>