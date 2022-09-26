<script setup>
import { useStore } from '../store/index.js'

const store = useStore()
const router = useRouter()
const showFilter = ref(false)

const favoriteFilter = () => {
  store.favorite === true ? router.push({ path: '/search/' + store.searchWord, query: { filter: store.filter, favorite: false }}) : router.push({ path: '/search/' + store.searchWord, query: { filter: store.filter, favorite: true }})
}

</script>

<template>
<div id="filter-bar" class="mb-3">
  <SearchBar />
  <div class="h-fit w-full mt-5" v-bind:class="{ 'bg-zinc-100 rounded-lg border-2 md:border-t-0 md:border-r-0 md:border-l-2 md:border-b-2 border-black': showFilter }">
    <div class="flex flex-wrap md:flex-nowrap md:h-14">
      <div class="w-full md:w-1/6 rounded-tl-lg flex" v-bind:class="{ 'md:border-t-2 border-black': showFilter }">
        <div @click="showFilter = !showFilter" class="h-14 w-20 flex justify-between items-center font-medium cursor-pointer">
          <span class="material-symbols-outlined">tune</span>
          <span>Filtres</span>
        </div>
      </div>
      <div
      class="w-full bg-white rounded-bl-lg flex flex-wrap md:flex-nowrap justify-end pl-5 items-center gap-5 md:w-5/6"
      v-bind:class="{ 'hidden md:flex md:border-l-2 md:border-b-2 md:border-black': showFilter }">
      <SortButton />
        <div class="flex items-center">
          <span class="mr-2 font-medium">Affichage :</span>
          <div class="h-10 w-24 grid grid-cols-2 bg-zinc-100 rounded-md border-2 border-black">
            <div v-on:click="store.grid = true" class="border-r border-black grid place-content-center cursor-pointer">
              <span class="material-symbols-outlined icone-fill text-3xl">grid_view</span>
            </div>
            <div v-on:click="store.grid = false" class="border-l border-black grid place-content-center cursor-pointer">
              <span class="material-symbols-outlined icone-fill text-3xl">view_list</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="showFilter" class="h-fit w-full rounded-br border-black flex flex-col p-5 gap-2 md:border-r-2 md:flex-row md:justify-between">
      <div class="flex flex-wrap gap-1">
        <div class="font-medium">Tags :</div>
        <template v-for="tag in store.tags" :key="tag">
        <CardTag v-if="tag === 'art'" class="bg-art" :tag="tag" mode="add" />
        <CardTag v-else-if="tag === 'Interactive space'" class="bg-interactive-space" :tag="tag" mode="add" />
        <CardTag v-else-if="tag === 'experiment'" class="bg-experiment" :tag="tag" mode="add" />
        <CardTag v-else-if="tag === 'Augmented reality'" class="bg-augmented-reality" :tag="tag" mode="add" />
        <CardTag v-else-if="tag === 'commercial'" class="bg-commercial" :tag="tag" mode="add" />
        <CardTag v-else-if="tag === 'Video mapping'" class="bg-video-mapping" :tag="tag" mode="add" />
        <CardTag v-else-if="tag === 'ledscreen'" class="bg-led-screen" :tag="tag" mode="add" />
        <CardTag v-else-if="tag === 'Application'" class="bg-application" :tag="tag" mode="add" />
        <CardTag v-else-if="tag === 'city'" class="bg-city" :tag="tag" mode="add" />
        <CardTag v-else-if="tag === 'robot'" class="bg-robot" :tag="tag" mode="add" />
        <CardTag v-else-if="tag === 'sound'" class="bg-sound" :tag="tag" mode="add" />
        <CardTag v-else-if="tag === 'mars'" class="bg-mars" :tag="tag" mode="add" />
        <CardTag v-else-if="tag === 'meditation'" class="bg-meditation" :tag="tag" mode="add" />
        <CardTag v-else-if="tag === 'festival'" class="bg-festival" :tag="tag" mode="add" />
        <CardTag v-else-if="tag === 'interactive maps' || tag === 'interactive map'" class="bg-interactive-map" :tag="tag" mode="add" />
        <CardTag v-else-if="tag === 'picture'" class="bg-picture" :tag="tag" mode="add" />
        <CardTag v-else-if="tag === 'maps'" class="bg-maps" :tag="tag" mode="add" />
        <CardTag v-else-if="tag === 'museum'" class="bg-museum" :tag="tag" mode="add" />
        <CardTag v-else :tag="tag" mode="add"/>
      </template>
      </div>
        <div class="flex items-center cursor-pointer" v-on:click="favoriteFilter">
          <span class="font-medium pr-2">Favoris :</span>
          <div class="h-6 w-6 rounded border border-black bg-zinc-200 grid place-content-center">
            <div v-if="store.favorite" class="h-4 w-4 rounded border border-black bg-yellow-300"></div>
          </div>
        </div>
    </div>
  </div>
  <TagBar v-show="showFilter"/>
</div>
</template>