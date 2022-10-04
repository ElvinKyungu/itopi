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

// get reference to the project card component
const projectCard = ref({})

/**
 * when the DOM is updated with the project card component, use the intersection observer API to track all cards in screen 
 * view. Cards have a hidden style, and when they appear in screen view, they change visibility
 */
onUpdated(() => {
  const projectCard = document.querySelectorAll('.hide')
  const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting){
          entry.target.classList.add('show')
          entry.target.classList.add('hide')
          observer.unobserve(entry.target)
        }
      })
    })
    projectCard.forEach((el) => observer.observe(el))
})

</script>

<template>
  <div id="grid-view" v-if="filteredData != null && filteredData.length !== 0" class="grid grid-cols-1 xs:justify-center xs:justify-items-center md:flex md:flex-row gap-6 md:flex-wrap md:justify-between">
    <ProjectCard 
      v-for="project in filteredData"
      :key="project.item.id"
      :id="project.item.id"
      :title="project.item.fields.Name"
      :artiste="project.item.fields.Artiste"
      :lieux="project.item.fields.Lieux"
      :year="project.item.fields.Année"
      :img="getImg(project)"
      :tags="getTags(project)"
      class="hide"
      ref="projectCard"
    />
    <div v-for="index in 4" :key="index" class="w-32 md:w-64"></div>
  </div>
</template>

<style>
  .hide {
    opacity: 0;
    filter: blur(1px);
    transition: all 1s;
  }
  .show {
    opacity: 1;
    filter: blur(0);
  }
</style>