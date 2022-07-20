<script setup>
import { useStore } from '../store/index.js'

const store = useStore()
</script>

<template>
  <div class="h-12 flex items-center">
    <div class="mr-2">Mes filtres:</div>
    <div v-if="store.filter.length === 0" class="h-6 w-32 rounded-md border border-black border-dashed"></div>
    <CardTag v-for="tag in store.filter" :key="tag" :tag="tag" mode="delete"/>
  </div>
</template>