<script setup>
import { useStore } from '../store/index.js'
import Fuse from 'fuse.js'

const store = useStore()

const options = {
  isCaseSensitive: false,
  findAllMatches: true,
  includeScore: true,
  shouldSort: true,
  includeMatches: true,
  threshold: 0.3,
  keys:['fields.Name', 'fields.Notes', 'fields.Mots_clefs']
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
  if (store.searchWord === '') {
    const result = formatData(store.data)
    return result
  }
  else {
    options.minMatchCharLength = store.searchWord.length
    const fuse = new Fuse(store.data, options)
    return fuse.search(store.searchWord)
  }
})


</script>

<template>
<section id="index">
  <SearchBar />
  <div class="flex flex-wrap justify-around">
    <ProjectCard 
      v-for="project in filteredData"
      :key="project.item.id"
      :title="project.item.fields.Name"
      :artiste="project.item.fields.Notes"
      :img="project.item.fields.Attachments[0].url"
      :tags="project.item.fields.Mots_clefs"
    />
    <div v-for="index in 4" :key="index" class="w-64 mx-5"></div>
  </div>
</section>
</template>