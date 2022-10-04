<script setup>
import { useStore } from '../store/index.js'
import { getImg } from '../tools/utils.js'

const store = useStore()
const router = useRouter()
const currentProject = ref([])
const tag = ref('')
const mode = ref('')

const leave = () => {
  currentProject.value = []
  router.push({ path: '/search/' + store.searchWord, query: { filter: store.filter, favorite: store.favorite }})
}

const cardAction = () => {
  if (mode.value === 'add') {
    addFilter(tag.value)
  } else if (mode.value === 'delete') {
    deleteFilter(tag.value)
  }
}

const addFilter = (tag) => {
  const filter = [...store.filter]
  if (filter.includes(tag)){
    const index = filter.indexOf(tag)
    filter.splice(index)
  } else {
    filter.push(tag)
  }
  router.push({ path: '/search/' + store.searchWord, query: { filter: filter, favorite: store.favorite }})
}

const deleteFilter = (tag) => {
  const filter = [...store.filter]
  if (filter.includes(tag)){
    const index = filter.indexOf(tag)
    filter.splice(index, 1)
  }
  router.push({ path: '/search/' + store.searchWord, query: { filter: filter, favorite: store.favorite }})
}

const changeProject = (shift) => {
  const index = store.filteredProject.indexOf(project.value.id)
  const newProjectIndex = index + shift
  if (newProjectIndex >= 0 && newProjectIndex < store.filteredProject.length) {
    const newProjectId = store.filteredProject[newProjectIndex]
    router.push({ path: '/search/' + store.searchWord, query: { filter: store.filter, project: newProjectId, favorite: store.favorite }})
  }
}

const project = computed(() => {
  const project = store.getProject(store.project)
  return project
})

watchEffect(() => {
  if(!currentProject) {
    currentProject.value = project
    console.log(currentProject.value);
  } else {
    console.log('no match');
  }
})

const handleKeyPress = (e) => {
  switch (e.key) {
    case "Escape":
      leave()
      break
    case "ArrowRight":
      changeProject(1)
      break
    case "ArrowLeft":
      changeProject(-1)
      break
  }
}

onMounted(() => {
  window.addEventListener('keydown',handleKeyPress)
  document.querySelector('#project-view').classList.add('animate-pulse-once')
  store.blur = true
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
  store.blur = false
})

onUpdated(() => {
  const info = document.querySelector('#project-info')
  if(info.classList.contains('animate-fade-in')){
    info.classList.remove('animate-fade-in')
  } else {
    info.classList.add('animate-fade-in')
    setTimeout(
      function() {
        info.classList.remove('animate-fade-in')
      }, 300
    )}
})

// disable main window scroll and hide "back to top" button when component loads
onBeforeMount(() => {
  document.body.style.overflow = 'hidden'
  const topButton = document.querySelector('#btn-back-to-top')
  topButton.style.display = 'none'
})

// enable main window scroll and show "back to top" button when component loads
onBeforeUnmount(() => {
  document.body.style.overflow = 'auto'
  if(window.scrollY > 350){
    const topButton = document.querySelector('#btn-back-to-top')
    topButton.style.display = 'block'
  }
})
</script>

<template>
  <div @click.self="leave" class="h-screen w-screen fixed top-0 inset-x-0 z-30 bg-white/75 grid md:place-content-center" id="project-view" :class="{'md:blur-md':store.modalOpen}">
    <Alert v-if="store.alert"/>
    <div
    v-if="project != null"
    class="h-full w-full sm:w-[100rem] sm:h-[50rem] relative z-30 bg-white md:outline outline-2 outline-black md:rounded-lg md:grid md:grid-cols-7 md:gap-10 px-6 md:px-14 py-12 overflow-scroll sm:overflow-hidden">
    <div class="md:h-[47rem] md:-mt-[1.5rem] md:-ml-[2rem] h-[15rem] w-full col-span-3 rounded-lg outline outline-2 outline-black mb-2">
      <a :href="project.fields.url" target="_blank">
        <ImageLazy :img="getImg({item: project}, 'full') || '../assets/img/no-photo.jpg'"/>
      </a>
    </div>
    <div class="col-span-4 xs:h-[48rem] xs:self-start h-fit w-full md:-mt-8 overflow-hidden pb-1">
      <div @click="leave" class="absolute top-[3rem] right-[1.5rem] h-10 w-10 z-10 flex justify-center items-center cursor-pointer bg-slate-500 opacity-75 sm:bg-white sm:opacity-100 rounded hover:bg-slate-200 hover:rounded hover:duration-200 hover:ease-in md:top-2 md:right-[.4rem] text-white sm:text-black">
        <span class="text-4xl">X</span>
      </div>
      <div class="flex absolute h-full w-7 bottom-20 items-start left-0 top-32 md:h-full md:w-10 md:left-2 md:bottom-0 md:items-center md:top-0 md:left-[41.3rem]">
        <div v-if="store.filteredProject.indexOf(project.id) > 0" v-on:click="changeProject(-1)" class="h-20 w-full grid rounded place-content-center cursor-pointer bg-slate-200/50 hover:duration-200 hover:ease-in hover:bg-slate-300 md:h-10 md:w-10 md:bg-black/25 md:hover:bg-black/50 select-none">
          <span class="material-symbols-outlined">arrow_back_ios_new</span>
        </div>
      </div>
      <div class="absolute flex h-full w-7 right-0 items-start top-32 md:bottom-0 md:w-fit md:right-2 md:items-center md:top-0">
        <div v-if="store.filteredProject.indexOf(project.id) < store.filteredProject.length - 1" v-on:click="changeProject(1)" class="h-20 w-full rounded grid place-content-center cursor-pointer bg-slate-200/50 hover:duration-200 hover:ease-in hover:bg-slate-300 md:h-10 md:w-10 md:bg-black/25 md:hover:bg-black/50 select-none">
          <span class="material-symbols-outlined">arrow_forward_ios</span>
        </div>
      </div>
      <div class="md:h-full w-full col-span-4">
        <div class="h-full min-h-full px-1 w-full xs:no-scrollbar xs:overflow-y-auto" id="project-info">
          <div class="min-h-1/2 flex flex-col justify-between gap-3 xs:sticky xs:top-0 bg-white">
            <h2 class="text-xl md:text-5xl font-medium md:mb-3">{{ project.fields.name}}</h2>
            <h3 class="text-lg md:text-3xl font-medium md:mb-3">{{ project.fields.artist }}</h3>
            <div class="flex flex-col justify-between gap-1">
              <p class="text-base md:text-xl">{{ project.fields.place }}</p>
              <p class="text-base md:text-xl md:mb-3">{{ project.fields.year }}</p>
            </div>
            <div class="flex flex-row flex-1 gap-2">
              <AddToFavorite class="-mt-1" :id="project.id" />
              <a
              v-if="project.fields.url"
              class="text-sm md:text-sm flex items-center mb-2 break-all"
              :href="project.fields.url"
              target="_blank">
              <span class="material-symbols-outlined pr-2">link</span>
              {{ project.fields.url }}
            </a>
            </div>
            <div class="flex flex-wrap gap-2 pt-2 xs:mb-2">
              <template v-for="tag in project.fields.InstallationType" :key="tag" class="hover:scale-105"
              @filter-by-tag="cardAction">
                <CardTag v-if="tag === 'art'" class="bg-art" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'Interactive space'" class="bg-interactive-space" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'experiment'" class="bg-experiment" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'Augmented reality'" class="bg-augmented-reality" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'commercial'" class="bg-commercial" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'Video mapping'" class="bg-video-mapping" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'ledscreen'" class="bg-led-screen" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'Application'" class="bg-application" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'city'" class="bg-city" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'robot'" class="bg-robot" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'sound'" class="bg-sound" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'mars'" class="bg-mars" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'meditation'" class="bg-meditation" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'festival'" class="bg-festival" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'interactive maps'" class="bg-interactive-map" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'picture'" class="bg-picture" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'maps'" class="bg-maps" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'museum'" class="bg-museum" :tag="tag" mode="add" />
                <CardTag v-else :tag="tag" mode="add"/>
              </template>
              <template v-for="tag in project.fields.tags" :key="tag" class="cursor-pointer hover:scale-105"
              @filter-by-tag="cardAction">
                <CardTag v-if="tag === 'art'" class="bg-art" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'Interactive space'" class="bg-interactive-space" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'experiment'" class="bg-experiment" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'Augmented reality'" class="bg-augmented-reality" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'commercial'" class="bg-commercial" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'Video mapping'" class="bg-video-mapping" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'ledscreen'" class="bg-led-screen" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'Application'" class="bg-application" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'city'" class="bg-city" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'robot'" class="bg-robot" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'sound'" class="bg-sound" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'mars'" class="bg-mars" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'meditation'" class="bg-meditation" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'festival'" class="bg-festival" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'interactive map'" class="bg-interactive-map" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'picture'" class="bg-picture" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'maps'" class="bg-maps" :tag="tag" mode="add" />
                <CardTag v-else-if="tag === 'museum'" class="bg-museum" :tag="tag" mode="add" />
                <CardTag v-else :tag="tag" mode="add"/>
              </template>
            </div>
          </div>
          <div class="md:grid xs:mt-2 w-full max-h-full gap-2">
            <div class="xs:-mt-3 empty:hidden">
              <EmbedVideo v-if="project.fields.VideoUrl != null" :videoUrl="project.fields.VideoUrl"/>
              <FileVideo v-if="project.fields.video != null" :video="project.fields.video"/>
            </div>
            <div v-if="project.fields.description != null && store.locale.fr" class="max-h-fit w-full my-2 md:my-0 empty:hidden md:tracking-wider">
              <p class="w-full h-fit bg-zinc-100 rounded-lg outline-black md:px-2 px-4 xs:py-1 font-medium overflow-auto">{{ project.fields.description }}</p>
            </div>
            <div v-else-if="project.fields.description != null && store.locale.en" class="max-h-fit w-full my-2 md:my-0 empty:hidden md:tracking-wider">
              <p class="w-full h-fit bg-zinc-100 rounded-lg outline-black md:px-2 px-4 xs:py-1 font-medium overflow-auto">{{ project.fields.descriptionEN }}</p>
            </div>
            <ProjectModal @click.self="leave" :projectName="project.fields.name"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
