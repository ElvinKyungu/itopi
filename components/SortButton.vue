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

</script>

<template>
  <div class="w-44">
    <div v-on:click="showOption = !showOption" class="w-full">
      Trier Par : {{ store.sort.name }}
    </div>
    <div v-if="showOption" class="w-44 rounded-md absolute z-20 bg-white">
      <div v-for="(option, index) in options" :key="index">
        <div v-on:click="store.sort = option; showOption = false" class="h-6 w-full hover:bg-zinc-100 px-2">{{ option.name }}</div>
      </div>
    </div>
  </div>
</template>