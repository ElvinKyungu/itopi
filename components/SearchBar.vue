<script setup>
import { useStore } from '../store/index.js'

const ENTER_KEY = 13
const store = useStore()
const router = useRouter()
const input = ref('')

const search = () => {
  store.searchWord = input.value
  router.push({ path: '/search/' + input.value})
}

 onMounted(() => {
  window.addEventListener('keypress', e => {
    if (e.keyCode === ENTER_KEY) {
      search()
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('keypress', e => {
    if ( e.keyCode === ENTER_KEY) {
      search()
    }
  })
})
</script>

<template>
<div class="h-12 w-full outline outline-[3px] outline-black flex justify-end">
  <FilterList />
  <input class="w-64 bg-transparent border-l-[3px] border-black px-5" placeholder=" _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _" v-model="input"/>
  <div v-on:click="search" class="w-32 border-l-[3px] border-black grid place-content-center">Search</div>
</div>
</template>