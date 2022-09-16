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
  lieux: {
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

</script>

<template>
<div id="project_card" class="group w-60 h-96 md:w-64 bg-zinc-100 outline outline-2 hover:outline-[3px] outline-black rounded-xl overflow-hidden cursor-pointer xs:w-80">
  <div class="h-3/5 md:h-56 w-full relative rounded-t-xl">
    <AddToFavorite :id="id" class="absolute"/>
    <ImageLazy @click="projectPage" :img="img || '../assets/img/no-photo.jpg'" :hover="true" />
    <div class="absolute z-20 h-5 w-20 rounded-lg border-2 border-black bg-zinc-100 bottom-2 left-2 text-[10px] font-bold font-inter hidden group-hover:flex place-content-center select-none transition ease-in-out hover:-translate-y-1 hover:scale-125 hover:bg-slate-100 duration-300" @click="projectPage">Voir plus ...</div>
  </div>
  <div @click="projectPage" class="h-20 md:h-36 border-t-2 border-black px-2 relative pt-3 md:pt-2">
    <CardTitle class="font-semibold" :title="artiste"/>
    <CardTitle class="font-medium" :title="title"/>
    <CardTitle class="font-medium" :title="lieux"/>
    <CardTitle class="font-medium" :title="year"/>
    <div class="mt-[.1rem] flex flex-wrap gap-2 md:gap-1.5">
      <CardTag v-for="(tag, index) in tags.slice(0, 4)" :key="index" :tag="tag" mode="card"/>
    </div>
  </div>
</div>
</template>