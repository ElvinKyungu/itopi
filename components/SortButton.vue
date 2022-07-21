<script setup>
import { useStore } from '../store/index.js'

const store = useStore()
const showOption = ref(false)
const options = [ 
  { name: 'Pertinence', field: null },
  { name: 'Date', field: 'Année'},
  { name: 'Titre', field: 'Name' },
  { name: 'Artiste', field: 'Notes'}
]

const updateSortOption = (newOption) => {
  store.sort.name = newOption.name
  store.sort.field = newOption.field
  showOption.value = false
}

</script>

<template>
  <div class="w-48">
    <div class="w-full flex justify-between font-medium">
      <span v-on:click="store.sort.reverse = !store.sort.reverse" v-if="!store.sort.reverse" class="material-symbols-outlined">arrow_upward</span>
      <span v-on:click="store.sort.reverse = !store.sort.reverse" v-else class="material-symbols-outlined">arrow_downward</span>
      Trier Par : 
      <span v-on:click="showOption = !showOption" class="w-20">{{ store.sort.name }}</span>
    </div>
    <div v-if="showOption" class="w-52 rounded-md absolute z-20 bg-white">
      <div v-for="(option, index) in options" :key="index">
        <div v-on:click="updateSortOption(option)" class="h-6 w-full hover:bg-zinc-100 pl-28">{{ option.name }}</div>
      </div>
    </div>
  </div>
</template>