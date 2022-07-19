<script setup>
import { useStore } from '../store/index.js'

const store = useStore()
const showFilter = ref(false)
const router = useRouter()

const addFilter = (tag) => {
  const filter = [...store.filter]
  if (filter.includes(tag)){
    const index = filter.indexOf(tag)
    filter.splice(index)
  } else {
    filter.push(tag)
  }
  router.push({ path: '/search/' + store.searchWord, query: { filter: filter }})
}
</script>

<template>
  <div class="h-fit w-52 relative z-10">
    <div v-on:click="showFilter = !showFilter" class="h-12 w-full border-l-[3px] border-black grid place-content-center"> Filter </div>
    <ul v-if="showFilter" class="w-full border-[3px] border-black bg-white">
      <li v-on:click="addFilter(tag)" class="hover:bg-slate-200" v-for="tag in store.tags" :key="tag">{{ tag }}</li>
    </ul>
  </div>
</template>