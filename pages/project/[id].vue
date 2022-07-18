<script setup>
import { useStore } from '../../store/index.js'

const route = useRoute()
const store = useStore()

const project = computed(() => {
  const project = store.getProject(route.params.id)
  console.log('project', project)
  return project
})

</script>

<template>
<div v-if="project != null"> {{project.fields.Name}} </div>
<div v-else> Ce Projet n'existe pas </div>
</template>