<script setup>
import { useStore } from '../store/index.js'
import FuzzySearch from 'fuzzy-search'

const store = useStore()

const filteredData = computed(() => {
  if (store.searchWord === '') {
    return store.data
  }
  else {
    const searcher = new FuzzySearch(
      store.data,
      ['fields.Name', 'fields.Notes', 'fields.Mots_clefs'], {
        caseSensitive: false,
        sort: true
    })
    return searcher.search(store.searchWord)
  }
})


</script>

<template>
<div id="index">
  <SearchBar />
  <div class="flex flex-wrap justify-around">
    <ProjectCard 
      v-for="project in filteredData"
      :key="project.id"
      :title="project.fields.Name"
      :artiste="project.fields.Notes"
      :img="project.fields.Attachments[0].url"
      :tags="project.fields.Mots_clefs"
    />
  </div>
</div>
</template>