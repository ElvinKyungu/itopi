<script setup>
import { useStore } from '../store/index.js'

const props = defineProps({
  id: {
    Type: String
  },
  title: {
    Type: String
  },
  artiste: {
    Type: String
  },
  img: {
    Type : String
  },
  tags: {
    Type: Array,
    default(rawProps) {
        return []
      }
    }
})

const router = useRouter()
const store = useStore()

const projectPage = () => {
  router.push({ path: '/search/' + store.searchWord, query: { filter: store.filter, project: props.id }})
}

const addToFavorite = () => {
  if (store.favorite.includes(props.id) == false) {
    store.favorite.push(props.id)
  } else {
    const index = store.favorite.indexOf(props.id)
    store.favorite.splice(index, 1)
  }
}

const favorite = computed(() =>  store.favorite.includes(props.id))

const showCard = computed(() => {
  if (store.filter.length > 0) {
    for (let tag of props.tags) {
      if (store.filter.includes(tag)) {
        return true
      }
    }
    return false
  }
  return true
})
</script>

<template>
<div v-if="showCard" id="project_card" class="h-96 w-64 bg-zinc-100 outline outline-2 outline-black rounded-xl overflow-hidden">
  <div class="h-64 w-full relative rounded-t-xl">
    <div v-on:click="addToFavorite" class="h-7 w-7 bg-white border border-black rounded-full absolute top-2 right-2 z-20 grid place-content-center">
      <span v-if="!favorite" class="material-symbols-outlined font-thin text-3xl">grade</span>
      <span v-else class="material-symbols-outlined font-thin text-xl icone-fill">grade</span>
    </div>
    <ImageLazy :img="img"/>
  </div>
  <div class="border-t-2 border-black px-2 relative">
    <div v-on:click="projectPage" class="h-6 w-6 bg-black rounded-full absolute top-2 right-2 z-20 flex justify-center">
      <span class="text-white text-sm">¡</span>
    </div>
    <CardTitle class="font-medium" :title="title"/>
    <CardTitle class="font-semibold" :title="artiste"/>
    <div class="mt-2 flex flex-wrap">
      <CardTag v-for="(tag, index) in tags" :key="index" :tag="tag" mode="card"/>
    </div>
  </div>
</div>
</template>