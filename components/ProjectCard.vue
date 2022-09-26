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
    },
})

const router = useRouter()
const store = useStore()

const projectPage = () => {
  router.push({ path: '/search/' + store.searchWord, query: { filter: store.filter, project: props.id, favorite: store.favorite }})
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.isIntersecting ? entry.target.classList.add('show') : entry.target.classList.remove('show')
    })
  })
  
  const hiddenCard = document.querySelectorAll('.hide')
  hiddenCard.forEach((el) => observer.observe(el))
})

</script>

<template>
<div id="project_card" class="group w-60 h-96 md:w-64 bg-zinc-100 outline outline-2 hover:outline-[3px] hover:transition-[delay-1000] outline-black rounded-xl overflow-hidden cursor-pointer xs:w-80 hide">
  <div class="h-3/5 md:h-56 w-full relative rounded-t-xl">
    <AddToFavorite :id="id" class="absolute"/>
    <ImageLazy @click="projectPage" :img="img || '../assets/img/no-photo.jpg'" :hover="true" />
    <div class="absolute hidden z-20 h-5 w-20 rounded-lg border-2 border-black bg-zinc-100 bottom-2 left-2 text-[10px] font-bold font-inter group-hover:flex group-hover:animate-pulse-once place-content-center select-none hover:bg-gradient-45 hover:bg-gradient-to-r from-[#FECFFF] via-[#FFECCF] to-[#CFE8FF] hover:duration-200 hover:ease-in-out hover:scale-110" @click="projectPage">Voir plus...</div>
  </div>
  <div @click="projectPage" class="h-20 md:h-36 border-t-2 border-black px-2 relative pt-3 md:pt-2">
    <CardTitle class="font-semibold" :title="artiste"/>
    <CardTitle class="font-medium" :title="title"/>
    <CardTitle class="font-medium" :title="lieux"/>
    <CardTitle class="font-medium" :title="year"/>
    <div class="mt-[.1rem] flex flex-wrap gap-2 md:gap-1.5">
      <template v-for="tag in tags.slice(0, 4)" :key="tag">
        <CardTag v-if="tag === 'art'" class="bg-art" :tag="tag" mode="card" />
        <CardTag v-else-if="tag === 'Interactive space'" class="bg-interactive-space" :tag="tag" mode="card" />
        <CardTag v-else-if="tag === 'experiment'" class="bg-experiment" :tag="tag" mode="card" />
        <CardTag v-else-if="tag === 'Augmented reality'" class="bg-augmented-reality" :tag="tag" mode="card" />
        <CardTag v-else-if="tag === 'commercial'" class="bg-commercial" :tag="tag" mode="card" />
        <CardTag v-else-if="tag === 'Video mapping'" class="bg-video-mapping" :tag="tag" mode="card" />
        <CardTag v-else-if="tag === 'ledscreen'" class="bg-led-screen" :tag="tag" mode="card" />
        <CardTag v-else-if="tag === 'Application'" class="bg-application" :tag="tag" mode="card" />
        <CardTag v-else-if="tag === 'city'" class="bg-city" :tag="tag" mode="card" />
        <CardTag v-else-if="tag === 'robot'" class="bg-robot" :tag="tag" mode="card" />
        <CardTag v-else-if="tag === 'sound'" class="bg-sound" :tag="tag" mode="card" />
        <CardTag v-else-if="tag === 'mars'" class="bg-mars" :tag="tag" mode="card" />
        <CardTag v-else-if="tag === 'meditation'" class="bg-meditation" :tag="tag" mode="card" />
        <CardTag v-else-if="tag === 'festival'" class="bg-festival" :tag="tag" mode="card" />
        <CardTag v-else-if="tag === 'interactive map'" class="bg-interactive-map" :tag="tag" mode="card" />
        <CardTag v-else-if="tag === 'picture'" class="bg-picture" :tag="tag" mode="card" />
        <CardTag v-else-if="tag === 'maps'" class="bg-maps" :tag="tag" mode="card" />
        <CardTag v-else-if="tag === 'museum'" class="bg-museum" :tag="tag" mode="card" />
        <CardTag v-else :tag="tag" mode="card" />
      </template>
    </div>
  </div>
</div>
</template>

<style>
  .hide {
    opacity: 0;
    filter: blur(1px);
    transition: all 1s;
  }
  .show {
    opacity: 1;
    filter: blur(0);
  }

</style>