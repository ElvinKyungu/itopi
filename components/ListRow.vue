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
  place: {
    Type: String
  },
  year: {
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
<div v-if="showCard" class="h-14 w-full grid grid-cols-11 odd:bg-zinc-100 even:bg-zinc-200 whitespace-nowrap">
  <div v-on:click="projectPage" class="h-14 border border-black"><ImageLazy :img="img"/></div>
  <ListTextCase class="col-span-2" :text="title"/>
  <ListTextCase class="col-span-2" :text="artiste"/>
  <ListTextCase class="col-span-2" :text="place"/>
  <ListTextCase :text="year"/>
  <span class="col-span-2 border border-black flex items-center overflow-hidden pl-5">
    <CardTag v-for="(tag, index) in tags" :key="index" :tag="tag" mode="card"/>
  </span>
  <div class="border border-black grid place-content-center">
    <div v-on:click="addToFavorite" class="h-7 w-7 bg-white border border-black rounded-full grid place-content-center">
      <span v-if="!favorite" class="material-symbols-outlined font-thin text-3xl">grade</span>
      <span v-else class="material-symbols-outlined font-thin text-xl icone-fill">grade</span>
    </div>
  </div>
</div>
</template>