<script setup>
import { useStore } from '../store/index.js'

const store = useStore()
const router = useRouter()
const showFilter = ref(false)

const favoriteFilter = () => {
  if (store.favorite === true) {
    router.push({ path: '/search/' + store.searchWord, query: { filter: store.filter }})
  } else {
    router.push({ path: '/search/' + store.searchWord, query: { filter: store.filter, favorite: true }})
  }
}
</script>

<template>
<div>
  <div id="filter-bar" class="h-fit w-full mt-5" v-bind:class="{ 'bg-zinc-100 rounded-lg border-l-2 border-b-2 border-black': showFilter }">
    <div class="flex h-14">
      <div v-on:click="showFilter = !showFilter" class="w-1/6 rounded-tl-lg grid place-content-center" v-bind:class="{ 'border-t-2 border-black': showFilter }">
        <div class="w-20 flex justify-between items-center font-medium">
          <span class="material-symbols-outlined">tune</span>
          <span>Filtres</span>
          </div>
      </div>
      <div
        class="w-5/6 bg-white rounded-bl-lg flex justify-end items-center gap-5"
        v-bind:class="{ 'border-l-2 border-b-2 border-black': showFilter }">
        <SortButton />
        <div class="flex items-center">
          <span class="mr-2 font-medium">Affichage :</span>
          <div class="h-10 w-24 grid grid-cols-2 bg-zinc-100 rounded-md border-2 border-black">
            <div v-on:click="store.grid = true" class="border-r border-black grid place-content-center">
              <span class="material-symbols-outlined icone-fill">grid_view</span>
            </div>
            <div v-on:click="store.grid = false" class="border-l border-black grid place-content-center">
              <span class="material-symbols-outlined icone-fill text-3xl">view_list</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="showFilter" class="h-fit w-full rounded-br border-r-2 border-black flex flex-col justify-around p-5 gap-2">
      <div class="w-full flex justify-between">
        <input class="h-7 w-52 px-5 text-xs rounded-lg bg-zinc-200" placeholder="Rechercher"/>
        <div class="flex items-center">
          <span class="font-medium pr-2">Favoris :</span>
          <div v-on:click="favoriteFilter" class="h-6 w-6 rounded border border-black bg-zinc-200 grid place-content-center">
            <div v-if="store.favorite" class="h-4 w-4 rounded border border-black bg-yellow-300"></div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="font-medium">Tags:</div>
        <CardTag v-for="tag in store.tags" :key="tag" :tag="tag" mode="add"/>
      </div>
    </div>
  </div>
  <TagBar v-show="showFilter"/>
</div>
</template>