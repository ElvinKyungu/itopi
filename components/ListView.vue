<script setup>
import { useStore } from '../store/index'
import { getImg, getTags } from '../tools/utils'

defineProps({
  filteredData: {
    Type: Array,
    default(rawProps) {
      return []
    }
  }
})

const store = useStore()
const router = useRouter()

const updateSortOption = (newOption) => {
  store.sort.name = newOption.name
  store.sort.field = newOption.field
}

const projectPage = (id) => {
  router.push({ path: '/search/' + store.searchWord, query: { filter: store.filter, project: id, favorite: store.favorite }})
}

const addToFavorite = (id) => {
  currentId.value = id
  if (store.favoriteArray.includes(currentId.value) === false) {
    store.favoriteArray.push(currentId.value)
  } else {
    const index = store.favoriteArray.indexOf(currentId.value)
    store.favoriteArray.splice(index, 1)
  }
}
const currentId = ref('')
const favorite = computed(() =>  store.favoriteArray.includes(currentId.value))

</script>

<template>
  <div id="list-view" v-if="filteredData != null && filteredData.length !== 0" class="h-fit w-full font-medium">
  <div class="relative w-full overflow-hidden lg:hidden my-2 text-sm"
      v-for="project in filteredData"
      :key="project.item.id"
      :img="getImg(project)"
      >
    <input type="checkbox" class="absolute top-0 inset-x-0 w-3/4 h-full opacity-0 z-10 cursor-pointer" @click="projectPage(project.item.id)">
    <div class="bg-neutral-300 h-20 w-full flex items-end gap-2">
      <img :src="getImg(project)" class="w-20 h-20">
      <h1> {{project.item.fields.Name}}</h1>
      <!-- favourite icon -->
      <div class="absolute top-2 right-1" @click="addToFavorite(project.item.id)">
        <div class="grid place-content-center">
          <div class="h-6 w-6 bg-white border border-black rounded-full grid place-content-center">
            <span v-if="favorite && currentId === project.item.id" class="material-symbols-outlined font-thin text-xl icone-fill cursor-pointer">grade</span>
            <span v-else class="material-symbols-outlined font-thin text-3xl cursor-pointer">grade</span>
          </div>
        </div>
      </div>
    </div>
  </div>
    <div class="hidden lg:h-14 lg:max-w-full lg:bg-neutral-800 lg:text-white lg:rounded-t-lg lg:grid lg:grid-cols-11 lg:border lg:border-black">
      <div class="hidden lg:block lg:border lg:border-black lg:rounded-tl-lg"></div>
      <ListTextCase v-on:click="updateSortOption({ name: 'Titre', field: 'Name' })" text="Titre" class="col-span-2 cursor-pointer"/>
      <ListTextCase v-on:click="updateSortOption({ name: 'Artiste', field: 'Artiste' })" text="Artiste" class="col-span-2 cursor-pointer"/>
      <ListTextCase v-on:click="updateSortOption({ name: 'Lieux', field: 'Lieux' })" text="Lieux" class="col-span-2 cursor-pointer"/>
      <ListTextCase v-on:click="updateSortOption({ name: 'Date', field: 'Année' })" text="Année" class="cursor-pointer"/>
      <ListTextCase text="Tags" class="col-span-2"/>
      <div class="hidden lg:border lg:border-black lg:rounded-tr-lg"></div>
    </div>
    <div class="hidden lg:block">
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