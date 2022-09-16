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
  <div class="h-8 w-8 bg-white border border-black rounded-full top-2 right-1 z-10 grid place-content-center cursor-pointer transition ease-in-out hover:scale-110 duration-100" @click="addToFavorite(id)">
    <span v-if="store.favoriteArray.includes(id)" class="h-5 w-5">
      <img src="../assets/img/golden-star.svg" alt="gold star">
    </span>
    <span v-else class="h-5 w-5">
      <img src="../assets/img/star.svg" alt="normal star">
    </span>
  </div>
</template>

<style>

</style>