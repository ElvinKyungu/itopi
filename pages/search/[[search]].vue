<script setup>
import { onBeforeRouteUpdate } from 'vue-router'
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

const setParams = (url) => {
  store.searchWord = url.params.search
  if (url.query.filter != null) {
    if (Array.isArray(url.query.filter)) {
      store.filter =  url.query.filter
    } else {
      store.filter = [ url.query.filter ]
    }
  } else {
    store.filter = []
  }
  if (url.query.hasOwnProperty('project')) {
    store.project = url.query.project
  } else {
    store.project = null
  }
  return true
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

const sortData = (data) => {
  if (store.sort.field != null) {
    return data.sort((a, b) => {
      return a.item.fields[store.sort.field].localeCompare(b.item.fields[store.sort.field], undefined, {
        numeric: true,
        sensitivity: 'base'
      })
    })
  }
  return data
}

const filteredData = computed(() => {
  let filteredData = []
  if (store.data != null) {
    if (store.searchWord === '') {
      const result = formatData(store.data)
      filteredData = result
    }
    else {
      options.minMatchCharLength = store.searchWord.length
      const fuse = new Fuse(store.data, options)
      filteredData = fuse.search(store.searchWord)
    }
    filteredData = sortData(filteredData)
  }
  return filteredData
})


onBeforeRouteUpdate((to, from) => {
  setParams(to)
})

onMounted(() => {
  setParams(route)
})
</script>

<template>
<section id="index" class="px-10">
  <ProjectView v-if="store.project"/>
  <SearchBar />
  <FilterBar />
  <TagBar />
  <div v-if="filteredData != null && filteredData.length !== 0" class="flex flex-wrap justify-between gap-12">
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
