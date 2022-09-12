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

</script>

<template>
<div id="project_card" class="group w-80 h-96 md:w-64 bg-zinc-100 outline outline-2 hover:outline-[3px] outline-black rounded-xl overflow-hidden cursor-pointer">
  <div class="h-3/5 md:h-60 w-full relative rounded-t-xl">
    <AddToFavorite :id="id" class="absolute"/>
    <ImageLazy v-on:click="projectPage" :img="img || '../assets/img/no-photo.jpg'" :hover="true"/>
    <div class="absolute z-20 h-5 w-20 rounded-lg border-2  border-black bg-zinc-100 bottom-2 left-2 text-[10px] font-bold font-inter hidden group-hover:flex place-content-center">Voir plus ...</div>
  </div>
  <div v-on:click="projectPage" class="h-20 md:h-36 border-t-2 border-black px-2 relative pt-3 md:pt-2">
    <CardTitle class="font-medium" :title="title"/>
    <CardTitle class="font-semibold" :title="artiste"/>
    <div class="mt-1 flex flex-wrap gap-2 md:gap-1.5">
      <CardTag v-for="(tag, index) in tags.slice(0, 4)" :key="index" :tag="tag" mode="card"/>
    </div>
  </div>
</div>
</template>