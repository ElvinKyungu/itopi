<script setup>
import { getImg, getTags } from '../tools/utils'

defineProps({
  filteredData: {
    Type: Array,
    default(rawProps) {
        return []
      }
  }
})
</script>

<template>
  <div id="grid-view" v-if="filteredData != null && filteredData.length !== 0" class="grid grid-cols-1 justify-center justify-items-center md:flex md:flex-row gap-6 md:flex-wrap md:justify-between">
    <ProjectCard 
      v-for="project in filteredData"
      :key="project.item.id"
      :id="project.item.id"
      :title="project.item.fields.Name"
      :artiste="project.item.fields.Artiste"
      :img="getImg(project)"
      :tags="getTags(project)"
    />
    <div v-for="index in 4" :key="index" class="w-32 md:w-64"></div>
  </div>
</template>