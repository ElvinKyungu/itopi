<script setup>
import { useStore } from '../store/index.js'

const ENTER_KEY = 13
const store = useStore()
const router = useRouter()
const input = ref('')

const search = () => {
  router.push({ path: '/search/' + input.value, query: { filter: store.filter }})
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
<div id="search-bar" class="flex justify-end my-1">
  <input class="h-10 w-64 px-5 text-xs rounded-md bg-zinc-200" placeholder="Rechercher" v-model="input"/>
</div>
</template>