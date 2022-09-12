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
  <div class="h-20 w-full grid grid-cols-11 odd:bg-zinc-100 even:bg-zinc-200 whitespace-normal">
    <div v-on:click="projectPage" class="h-20 border border-black cursor-pointer font-normal"><ImageLazy :img="img"/></div>
    <ListTextCase v-on:click="projectPage" class="col-span-2 cursor-pointer font-normal" :text="title"/>
    <ListTextCase v-on:click="projectPage" class="col-span-2 cursor-pointer font-normal flex flex-wrap" :text="artiste"/>
    <ListTextCase v-on:click="projectPage" class="col-span-2 cursor-pointer font-normal flex flex-wrap" :text="place"/>
    <ListTextCase v-on:click="projectPage" :text="year" class="cursor-pointer font-normal"/>
    <span v-on:click="projectPage" class="col-span-2 border border-black flex flex-wrap items-center overflow-hidden p-2 cursor-pointer gap-2">
      <CardTag v-for="(tag, index) in tags.splice(0, 4)" :key="index" :tag="tag" mode="card"/>
    </span>
    <div class="border border-black grid place-content-center">
      <AddToFavorite :id="id" />
  </div>
</div>
</template>