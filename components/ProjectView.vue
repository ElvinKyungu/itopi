<script setup>
import { useStore } from '../store/index.js'

const ECAPE_KEY = 27
const store = useStore()
const router = useRouter()

const getImg = (project) => {
  if (project.fields.Attachments && project.fields.Attachments.length >= 1) {
    return project.fields.Attachments[0].thumbnails.full.url
  }
  return null
}

const leave = () => {
  router.push({ path: '/search/' + store.searchWord, query: { filter: store.filter, favorite: store.favorite }})
}

const changeProject = (shift) => {
  const index = store.filteredProject.indexOf(project.value.id)
  const newProjectIndex = index + shift
  if (newProjectIndex >= 0 && newProjectIndex < store.filteredProject.length) {
    const newProjectId = store.filteredProject[newProjectIndex]
    router.push({ path: '/search/' + store.searchWord, query: { filter: store.filter, project: newProjectId, favorite: store.favorite, favorite: store.favorite }})
  }
}

const project = computed(() => {
  const project = store.getProject(store.project)
  return project
})

 onMounted(() => {
  window.addEventListener('keydown', e => {
    if (e.key === "Escape" ) {
      leave()
    } else if (e.key === "ArrowRight" ) {
      changeProject(1)
    } else if (e.key === "ArrowLeft" ) {
      changeProject(-1)
    }
  })
})

onUnmounted(() => {
  window.addEventListener('keydown', e => {
    if (e.key === "Escape" ) {
      leave()
    } else if (e.key === "ArrowRight" ) {
      changeProject(1)
    } else if (e.key === "ArrowLeft" ) {
      changeProject(-1)
    }
  })
})
</script>

<template>
<div @click.self="leave" class="h-screen w-screen fixed top-0 inset-x-0 z-30 bg-white/50 grid md:place-content-center" id="project-view">
  <div
    v-if="project != null"
    class="h-full md:h-[900px] lg:h-[700px] xl:h-[600px] w-full md:w-[760px] lg:w-[1000px] xl:w-[1200px] relative z-30 bg-white md:outline outline-2 outline-black md:rounded-lg md:grid md:grid-cols-7 md:gap-10 px-6 md:px-14 py-12 overflow-hidden">
    <div @click="leave" class="visible md:hidden absolute top-2 right-2 h-10 w-10">
      <span class="material-symbols-outlined text-3xl">close</span>
    </div>
    <div class="h-full w-10 absolute left-2 flex items-center">
      <div v-if="store.filteredProject.indexOf(project.id) > 0" v-on:click="changeProject(-1)" class="h-10 w-10 rounded bg-black/25 hover:bg-black/50 grid place-content-center cursor-pointer">
        <span class="material-symbols-outlined">arrow_back_ios_new</span>
      </div>
    </div>
    <div class="h-full w-fit absolute right-2 flex items-center">
      <div v-if="store.filteredProject.indexOf(project.id) < store.filteredProject.length - 1" v-on:click="changeProject(1)" class="h-10 w-10 rounded bg-black/25 hover:bg-black/50 grid place-content-center cursor-pointer">
        <span class="material-symbols-outlined">arrow_forward_ios</span>
      </div>
    </div>
    <div class="h-50 sm:h-80 md:h-full w-full col-span-3 rounded-lg outline outline-2 outline-black overflow-hidden">
      <a :href="project.fields.URL" target="_blank">
        <ImageLazy :img="getImg(project)"/>
      </a>
    </div>
    <div class="md:h-full w-full col-span-4 overflow-y-scroll">
      <div class="h-fit min-h-full p-1">
        <div class="min-h-1/2 flex flex-col justify-between">
          <h2 class="text-xl md:text-5xl font-medium">{{ project.fields.Name}}</h2>
          <h3 class="text-lg md:text-4xl font-medium">{{ project.fields.Artiste }}</h3>
          <div>
            <p class="text-base md:text-xl">{{ project.fields.Lieux }}</p>
            <p class="text-base md:text-xl">{{ project.fields.Année }}</p>
            <a
              v-if="project.fields.URL"
              class="text-sm md:text-sm flex items-center"
              :href="project.fields.URL"
              target="_blank">
              <span class="material-symbols-outlined pr-2">link</span>
              {{ project.fields.URL }}
            </a>
          </div>
          <div class="flex flex-wrap gap-2 pt-2">
            <CardTag v-for="(tag, index) in project.fields.Installation_type" :key="index" :tag="tag" />
            <CardTag v-for="(tag, index) in project.fields.Mots_clefs" :key="index" :tag="tag" />
          </div>
        </div>
        <EmbedVideo v-if="project.fields.video_url != null" :videoUrl="project.fields.video_url"/>
        <FileVideo v-if="project.fields.video != null"  :video="project.fields.video"/>
        <div v-if="project.fields.Description != null" class="min-h-1/2 flex flex-col justify-between pt-2">
          <h5 class="font-medium">Description</h5>
          <p class="min-h-[200px] h-fit md:h-5/6 w-full bg-zinc-100 rounded-lg outline outline-2 outline-black p-4 font-medium">
            {{ project.fields.Description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>