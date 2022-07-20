<script setup>
import { useStore } from '../store/index.js'

const store = useStore()
const showFilter = ref(false)
</script>

<template>
<div id="filter-bar" class="h-fit w-full" v-bind:class="{ 'bg-zinc-100 rounded-lg border-l-2 border-b-2 border-black': showFilter }">
  <div class="flex h-12">
    <div v-on:click="showFilter = !showFilter" class="w-1/6 rounded-tl-lg grid place-content-center" v-bind:class="{ 'border-t-2 border-black': showFilter }">Filtres</div>
    <div
      class="w-5/6 bg-white rounded-bl-lg flex justify-end items-center gap-5"
      v-bind:class="{ 'border-l-2 border-b-2 border-black': showFilter }">
      <SortButton />
      <div class="flex items-center">
        <span class="mr-2">Affichage:</span>
        <div class="h-10 w-24 grid grid-cols-2 bg-zinc-100 rounded-md border-2 border-black">
          <div class="border-r border-black"></div>
          <div class="border-l border-black"></div>
        </div>
      </div>
    </div>
  </div>
  <div v-show="showFilter" class="h-fit w-full rounded-br border-r-2 border-black flex flex-col justify-around p-5 gap-2">
    <div>
      <input class="h-7 w-52 px-5 text-xs rounded-lg bg-zinc-200" placeholder="Rechercher"/>
    </div>
    <div class="flex flex-wrap">
      <div>Tags:</div>
      <CardTag v-for="tag in store.tags" :key="tag" :tag="tag" mode="add"/>
    </div>
  </div>
</div>
</template>