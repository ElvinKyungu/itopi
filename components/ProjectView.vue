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
<div @click.self="leave" class="h-screen w-screen fixed top-0 z-20 bg-white/50 grid place-content-center" id="project-view">
  <div v-if="project != null" class="h-[600px] w-[1200px] retalive z-30 bg-white outline outline-2 outline-black rounded-lg grid grid-cols-7 gap-10 px-14 py-12">
    <div class="h-full w-full col-span-3 rounded-lg outline outline-2 outline-black">
      <ImageLazy :img="getImg(project)" />
    </div>
    <div class="h-full w-full col-span-4">
      <div class="h-1/2 flex flex-col justify-between">
        <h2 class="text-6xl font-medium">{{ project.fields.Name}}</h2>
        <h3 class="text-4xl font-medium">{{ project.fields.Notes }}</h3>
        <div>
          <p class="text-xl">{{ project.fields.Lieux }}</p>
          <p class="text-xl">{{ project.fields.Année }}</p>
        </div>
        <div class="flex flex-wrap">
          <CardTag v-for="(tag, index) in project.fields.Mots_clefs" :key="index" :tag="tag" />
        </div>
      </div>
      <div class="h-1/2 flex flex-col justify-between pt-2">
      <h5 class="font-medium">Description</h5>
      <p class="h-5/6 w-full bg-zinc-100 rounded-lg outline outline-2 outline-black overflow-y-scroll"></p>
      </div>
    </div>
  </div>
</div>
</template>