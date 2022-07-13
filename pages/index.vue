<script setup>
import { useStore } from '../store/index.js'

const store = useStore()
</script>

<template>
<div id="index">
  <div class="flex flex-wrap justify-around">
    <ProjectCard 
      v-for="project in store.data"
      :key="project.id"
      :title="project.fields.Name"
      :artiste="project.fields.Notes"
      :img="project.fields.Attachments[0].url"
      :tags="project.fields.Mots_clefs"
    />
  </div>
</div>
</template>