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
  <div id="list-view" v-if="filteredData != null && filteredData.length !== 0" class="h-fit w-full font-medium">
    <div class="h-14 w-full bg-neutral-800 text-white rounded-t-lg grid grid-cols-11 border border-black">
      <div class="border border-black rounded-tl-lg"></div>
      <ListTextCase text="Titre" class="col-span-2"/>
      <ListTextCase text="Auteur.rice.s" class="col-span-2"/>
      <ListTextCase text="Lieux" class="col-span-2"/>
      <ListTextCase text="Année" />
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
        :tags="project.item.fields.Mots_clefs"
      />
    </div>
  </div>
</template>