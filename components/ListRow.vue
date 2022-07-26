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
  if (store.favoriteArray.includes(props.id) == false) {
    store.favoriteArray.push(props.id)
  } else {
    const index = store.favoriteArray.indexOf(props.id)
    store.favoriteArray.splice(index, 1)
  }
}

const favorite = computed(() =>  store.favoriteArray.includes(props.id))

const showCard = computed(() => {
  if (!store.favorite || (store.favorite && store.favoriteArray.includes(props.id))) {
    if (store.filter.length > 0) {
      for (let tag of props.tags) {
        if (store.filter.includes(tag)) {
          return true
        }
      }
      return false
    }
    return true
  }
  return false
})
</script>

<template>
<div v-if="showCard" class="h-14 w-full grid grid-cols-11 odd:bg-zinc-100 even:bg-zinc-200 whitespace-nowrap">
  <div v-on:click="projectPage" class="h-14 border border-black cursor-pointer"><ImageLazy :img="img"/></div>
  <ListTextCase v-on:click="projectPage" class="col-span-2 cursor-pointer" :text="title"/>
  <ListTextCase v-on:click="projectPage" class="col-span-2 cursor-pointer" :text="artiste"/>
  <ListTextCase v-on:click="projectPage" class="col-span-2 cursor-pointer" :text="place"/>
  <ListTextCase v-on:click="projectPage" :text="year"/>
  <span v-on:click="projectPage" class="col-span-2 border border-black flex items-center overflow-hidden pl-5 cursor-pointer">
    <CardTag v-for="(tag, index) in tags" :key="index" :tag="tag" mode="card"/>
  </span>
  <div class="border border-black grid place-content-center">
    <div v-on:click="addToFavorite" class="h-7 w-7 bg-white border border-black rounded-full grid place-content-center">
      <span v-if="!favorite" class="material-symbols-outlined font-thin text-3xl cursor-pointer">grade</span>
      <span v-else class="material-symbols-outlined font-thin text-xl icone-fill cursor-pointer">grade</span>
    </div>
  </div>
</div>
</template>