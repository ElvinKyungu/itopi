<script setup>
import { useStore } from '../store/index.js'

const store = useStore()
const router = useRouter()
const input = ref('')

const search = () => {
  router.push({ path: '/search/' + input.value, query: { filter: store.filter }})
}

 onMounted(() => {
  window.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      search()
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('keypress', e => {
    if ( e.key === 'Enter') {
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