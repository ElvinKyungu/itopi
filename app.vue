<script setup>
import { useStore } from './store/index.js'

const store = useStore()

store.setData()

window.addEventListener('beforeunload', () => {
  localStorage.setItem('top1000-favorite', store.favoriteArray)
})
</script>

<template>
  <div id="app">
    <HeaderArea />
    <NuxtPage />
    <FooterArea />
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh
}
</style>