<script setup>
import { useStore } from '../store/index.js'

const store = useStore()
const router = useRouter()

const leave = () => {
  router.push({ path: '/search/' + store.searchWord, query: { filter: store.filter }})
}

const project = computed(() => {
  const project = store.getProject(store.project)
  console.log('project', project)
  return project
})
</script>

<template>
<div @click.self="leave" class="h-screen w-screen fixed top-0 z-20 bg-white/50 grid place-content-center" id="project-view">
  <div class="h-96 w-96 retalive z-30 bg-white outline outline-[3px] outline-black">
  </div>
</div>
</template>