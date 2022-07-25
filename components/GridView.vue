<script setup>
defineProps({
  filteredData: {
    Type: Array,
    default(rawProps) {
        return []
      }
  }
})

const getImg = (project) => {
  if (project.item.fields.Attachments && project.item.fields.Attachments.length >= 1) {
    return project.item.fields.Attachments[0].thumbnails.large.url
  }
  return null
}
</script>

<template>
  <div id="grid-view" v-if="filteredData != null && filteredData.length !== 0" class="flex flex-wrap justify-center md:justify-between gap-6">
    <ProjectCard 
      v-for="project in filteredData"
      :key="project.item.id"
      :id="project.item.id"
      :title="project.item.fields.Name"
      :artiste="project.item.fields.Notes"
      :img="getImg(project)"
      :tags="project.item.fields.Mots_clefs"
    />
    <div v-for="index in 4" :key="index" class="w-32 md:w-64"></div>
  </div>
</template>