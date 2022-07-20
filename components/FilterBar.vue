<script setup>
import { useStore } from '../store/index.js'

const store = useStore()
</script>

<template>
<div class="h-44 w-full bg-zinc-100 rounded-lg border-l-2 border-b-2 border-black">
  <div class="flex h-1/3">
    <div class="w-1/6 rounded-tl-lg border-t-2 border-black grid place-content-center">Filtres</div>
    <div class="w-5/6 bg-white rounded-bl-lg border-l-2 border-b-2 border-black flex justify-end items-center gap-5">
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
  <div class="h-2/3 w-full rounded-br border-r-2 border-black flex flex-col justify-around px-5">
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