<script setup>
import { useStore } from '../store/index'

defineProps({
  filteredData: {
    Type: Array,
    default(rawProps) {
        return []
      }
  }
})

const store = useStore()

const getImg = (project) => {
  if (project.item.fields.Attachments && project.item.fields.Attachments.length >= 1) {
    return project.item.fields.Attachments[0].thumbnails.large.url
  }
  return null
}

const getTags = (project) => {
  let tags = []
  if (project.item.fields.hasOwnProperty('Installation_type')) {
    tags = tags.concat(project.item.fields.Installation_type)
  }
  if (project.item.fields.hasOwnProperty('Mots_clefs')) {
    tags = tags.concat(project.item.fields.Mots_clefs)
  }
  return tags
}

const updateSortOption = (newOption) => {
  store.sort.name = newOption.name
  store.sort.field = newOption.field
}
</script>

<template>
  <div id="list-view" v-if="filteredData != null && filteredData.length !== 0" class="h-fit w-full font-medium">
    <div class="h-14 w-full bg-neutral-800 text-white rounded-t-lg grid grid-cols-11 border border-black">
      <div class="border border-black rounded-tl-lg"></div>
      <ListTextCase v-on:click="updateSortOption({ name: 'Titre', field: 'Name' })" text="Titre" class="col-span-2 cursor-pointer"/>
      <ListTextCase v-on:click="updateSortOption({ name: 'Artiste', field: 'Artiste' })" text="Artiste" class="col-span-2 cursor-pointer"/>
      <ListTextCase v-on:click="updateSortOption({ name: 'Lieux', field: 'Lieux' })" text="Lieux" class="col-span-2 cursor-pointer"/>
      <ListTextCase v-on:click="updateSortOption({ name: 'Date', field: 'Année' })" text="Année" class="cursor-pointer"/>
      <ListTextCase text="Tags" class="col-span-2"/>
      <div class="border border-black rounded-tr-lg"></div>
    </div>
    <div >
      <ListRow
        v-for="project in filteredData"
        :key="project.item.id"
        :id="project.item.id"
        :title="project.item.fields.Name"
        :artiste="project.item.fields.Artiste"
        :place="project.item.fields.Lieux"
        :year="project.item.fields.Année"
        :img="getImg(project)"
        :tags="getTags(project)"
      />
    </div>
  </div>
</template>