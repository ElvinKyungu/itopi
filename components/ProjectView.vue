<script setup>
import { useStore } from '../store/index.js'

const store = useStore()
const router = useRouter()

const getImg = (project) => {
  if (project.fields.Attachments && project.fields.Attachments.length >= 1) {
    return project.fields.Attachments[0].thumbnails.full.url
  }
  return null
}

const leave = () => {
  router.push({ path: '/search/' + store.searchWord, query: { filter: store.filter }})
}

const project = computed(() => {
  const project = store.getProject(store.project)
  return project
})
</script>

<template>
<div @click.self="leave" class="h-screen w-screen fixed top-0 inset-x-0 z-30 bg-white/50 grid md:place-content-center" id="project-view">
  <div
    v-if="project != null"
    class="h-full md:h-[900px] lg:h-[700px] xl:h-[600px] w-full md:w-[760px] lg:w-[1000px] xl:w-[1200px] relative z-30 bg-white md:outline outline-2 outline-black md:rounded-lg md:grid md:grid-cols-7 md:gap-10 px-6 md:px-14 py-12">
    <div @click="leave" class="visible md:hidden absolute top-2 right-2 h-10 w-10">
      <span class="material-symbols-outlined text-3xl">close</span>
    </div>
    <div class="h-50 sm:h-80 md:h-full w-full col-span-3 rounded-lg outline outline-2 outline-black">
      <ImageLazy :img="getImg(project)" />
    </div>
    <div class="md:h-full w-full col-span-4">
      <div class="h-1/2 flex flex-col justify-between">
        <h2 class="text-xl md:text-6xl font-medium">{{ project.fields.Name}}</h2>
        <h3 class="text-lg md: text-4xl font-medium">{{ project.fields.Artiste }}</h3>
        <div>
          <p class="text-base md:text-xl">{{ project.fields.Lieux }}</p>
          <p class="text-base md:text-xl">{{ project.fields.Année }}</p>
        </div>
        <div class="flex flex-wrap">
          <CardTag v-for="(tag, index) in project.fields.Mots_clefs" :key="index" :tag="tag" />
        </div>
      </div>
      <div class="h-1/2 flex flex-col justify-between pt-2">
      <h5 class="font-medium">Description</h5>
      <p class="min-h-[200px] h-fit md:h-5/6 w-full bg-zinc-100 rounded-lg outline outline-2 outline-black overflow-y-scroll p-4 font-medium">
        {{ project.fields.Description }}
      </p>
      </div>
    </div>
  </div>
</div>
</template>