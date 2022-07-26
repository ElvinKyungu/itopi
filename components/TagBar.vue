<script setup>
import { useStore } from '../store/index.js'

const store = useStore()
</script>

<template>
  <div class="h-20 flex items-center font-medium gap-2">
    <div class="">Mes filtres :</div>
    <div v-if="store.filter.length === 0" class="h-6 w-32 rounded-md border border-black border-dashed"></div>
    <CardTag v-for="tag in store.filter" :key="tag" :tag="tag" mode="delete"/>
  </div>
</template>