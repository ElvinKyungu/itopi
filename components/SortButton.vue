<script setup>
import { useStore } from '../store/index.js'

const store = useStore()
const showOption = ref(false)
const optionsFr = [ 
  { name: 'Pertinence', field: null },
  { name: 'Date', field: 'year'},
  { name: 'Titre', field: 'name' },
  { name: 'Artiste', field: 'artist'},
  { name: 'Lieux', field: 'place'}
]

const optionsEn = [ 
  { name: 'Relevance', field: null },
  { name: 'Year', field: 'year'},
  { name: 'Title', field: 'name' },
  { name: 'Artist', field: 'artist'},
  { name: 'Place', field: 'place'}
]

const updateSortOption = (newOption) => {
  store.sort.name = newOption.name
  store.sort.field = newOption.field
  showOption.value = false
}

// if user clicks outside the dropdown menu, it closes
document.body.addEventListener('click', function(e){
  if(e.composedPath()[0].id != "dropdown") showOption.value = false
})

</script>

<template>
  <div class="h-14 w-56">
    <div class="h-full w-full flex items-center gap-2 font-medium" v-bind:class="{ 'bg-zinc-100 rounded-t-lg border-l-2 border-t-2 border-r-2 border-black': showOption }">
      <span @click="store.sort.reverse = !store.sort.reverse" v-if="!store.sort.reverse" class="material-symbols-outlined cursor-pointer">arrow_upward</span>
      <span @click="store.sort.reverse = !store.sort.reverse" v-else class="material-symbols-outlined cursor-pointer">arrow_downward</span>
      {{$t('sortBy')}} : 
      <span id="dropdown" @click="showOption = !showOption" class="w-24 cursor-pointer">{{ store.sort.name }}</span>
    </div>
    <div v-if="showOption && store.locale.fr" @mouseleave="showOption = false" class="w-56 rounded-b-lg absolute z-30 bg-zinc-100 border-l-2 border-b-2 border-r-2 border-black">
      <div v-for="(option, index) in optionsFr" :key="index">
        <div @click="updateSortOption(option)" class="h-6 w-full hover:bg-zinc-200 pl-32 cursor-pointer">{{ option.name }}</div>
      </div>
    </div>
    <div v-else-if="showOption && store.locale.en" @mouseleave="showOption = false" class="w-56 rounded-b-lg absolute z-30 bg-zinc-100 border-l-2 border-b-2 border-r-2 border-black">
      <div v-for="(option, index) in optionsEn" :key="index">
        <div @click="updateSortOption(option)" class="h-6 w-full hover:bg-zinc-200 pl-32 cursor-pointer">{{ option.name }}</div>
      </div>
    </div>
  </div>
</template>