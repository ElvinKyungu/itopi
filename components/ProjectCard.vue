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
  router.push({ path: '/search/' + store.searchWord, query: { filter: store.filter, project: props.id, favorite: store.favorite }})
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
</script>

<template>
<div  id="project_card" class="h-48 md:h-96 w-40 md:w-64 bg-zinc-100 outline outline-2 hover:outline-[3px] outline-black rounded-xl overflow-hidden cursor-pointer">
  <div class="h-20 md:h-60 w-full relative rounded-t-xl">
    <div v-on:click="addToFavorite" class="h-7 w-7 bg-white border border-black rounded-full absolute top-2 right-2 z-20 grid place-content-center">
      <span v-if="!favorite" class="material-symbols-outlined font-thin text-3xl">grade</span>
      <span v-else class="material-symbols-outlined font-thin text-xl icone-fill">grade</span>
    </div>
    <ImageLazy v-on:click="projectPage" :img="img" :hover="true"/>
  </div>
  <div v-on:click="projectPage" class="border-t-2 border-black px-2 relative">
    <CardTitle class="font-medium" :title="title"/>
    <CardTitle class="font-semibold" :title="artiste"/>
    <div class="mt-2 flex flex-wrap">
      <CardTag v-for="(tag, index) in tags" :key="index" :tag="tag" mode="card"/>
    </div>
  </div>
</div>
</template>