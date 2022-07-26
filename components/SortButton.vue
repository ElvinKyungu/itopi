<script setup>
import { useStore } from '../store/index.js'

const store = useStore()
const showOption = ref(false)
const options = [ 
  { name: 'Pertinence', field: null },
  { name: 'Date', field: 'Année'},
  { name: 'Titre', field: 'Name' },
  { name: 'Artiste', field: 'Artiste'},
  { name: 'Lieux', field: 'Lieux'}
]

const updateSortOption = (newOption) => {
  store.sort.name = newOption.name
  store.sort.field = newOption.field
  showOption.value = false
}

</script>

<template>
  <div class="h-14 w-56">
    <div class="h-full w-full flex items-center gap-2 font-medium" v-bind:class="{ 'bg-zinc-100 rounded-t-lg border-l-2 border-t-2 border-r-2 border-black': showOption }">
      <span v-on:click="store.sort.reverse = !store.sort.reverse" v-if="!store.sort.reverse" class="material-symbols-outlined cursor-pointer">arrow_upward</span>
      <span v-on:click="store.sort.reverse = !store.sort.reverse" v-else class="material-symbols-outlined cursor-pointer">arrow_downward</span>
      Trier Par : 
      <span v-on:click="showOption = !showOption" class="w-24 cursor-pointer">{{ store.sort.name }}</span>
    </div>
    <div v-if="showOption" class="w-56 rounded-b-lg absolute z-30 bg-zinc-100 border-l-2 border-b-2 border-r-2 border-black">
      <div v-for="(option, index) in options" :key="index">
        <div v-on:click="updateSortOption(option)" class="h-6 w-full hover:bg-zinc-200 pl-32 cursor-pointer">{{ option.name }}</div>
      </div>
    </div>
  </div>
</template>