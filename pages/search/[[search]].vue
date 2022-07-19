<script setup>
import { useStore } from '../../store/index.js'
import Fuse from 'fuse.js'

const store = useStore()
const route = useRoute()

const options = {
  ignoreLocation: true,
  isCaseSensitive: false,
  findAllMatches: true,
  includeScore: true,
  shouldSort: true,
  includeMatches: true,
  threshold: 0.3,
  keys:['fields.Name', 'fields.Notes', 'fields.Mots_clefs']
}

const getImg = (project) => {
  if (project.item.fields.Attachments && project.item.fields.Attachments.length >= 1) {
    return project.item.fields.Attachments[0].thumbnails.large.url
  }
  return null
}

const formatData = (data) => {
  const newData = []
  if (Array.isArray(data)) {
    for (let item of data) {
      newData.push({ item: item })
    }
  }
  return newData
}

const filteredData = computed(() => {
  if (store.data != null) {
    if (store.searchWord === '') {
      const result = formatData(store.data)
      return result
    }
    else {
      options.minMatchCharLength = store.searchWord.length
      const fuse = new Fuse(store.data, options)
      return fuse.search(store.searchWord)
    }
  } else {
    return []
  }
})

onMounted(() => {
  store.searchWord = route.params.search
  const searchParams = new URLSearchParams(window.location.search)
  store.filter =  searchParams.getAll('filter')
  if (searchParams.has('project')) {
    store.project = searchParams.get('project')
  }
})
</script>

<template>
<section id="index">
  <ProjectView v-if="store.project"/>
  <SearchBar />
  <div v-if="filteredData != null && filteredData.length !== 0" class="flex flex-wrap justify-around">
    <ProjectCard 
      v-for="project in filteredData"
      :key="project.item.id"
      :id="project.item.id"
      :title="project.item.fields.Name"
      :artiste="project.item.fields.Notes"
      :img="getImg(project)"
      :tags="project.item.fields.Mots_clefs"
    />
    <div v-for="index in 4" :key="index" class="w-64 mx-5"></div>
  </div>
  <div v-else class="h-80 w-full grid place-content-center">
    <div class="text-white text-xl font-bold">Pas de résultat pour cette recherche</div>
  </div>
</section>
</template>
