<script setup>
import { useStore } from '../store/index.js'

const store = useStore()
</script>

<template>
  <div class="h-20 flex items-center font-medium gap-2">
    <div class="">Mes filtres :</div>
    <div v-if="store.filter.length === 0" class="h-6 w-32 rounded-md border border-black border-dashed"></div>
    <template v-for="tag in store.filter" :key="tag">
        <CardTag v-if="tag === 'art'" class="bg-art" :tag="tag" mode="delete" />
        <CardTag v-else-if="tag === 'Interactive space'" class="bg-interactive-space" :tag="tag" mode="delete" />
        <CardTag v-else-if="tag === 'experiment'" class="bg-experiment" :tag="tag" mode="delete" />
        <CardTag v-else-if="tag === 'Augmented reality'" class="bg-augmented-reality" :tag="tag" mode="delete" />
        <CardTag v-else-if="tag === 'commercial'" class="bg-commercial" :tag="tag" mode="delete" />
        <CardTag v-else-if="tag === 'Video mapping'" class="bg-video-mapping" :tag="tag" mode="delete" />
        <CardTag v-else-if="tag === 'ledscreen'" class="bg-led-screen" :tag="tag" mode="delete" />
        <CardTag v-else-if="tag === 'Application'" class="bg-application" :tag="tag" mode="delete" />
        <CardTag v-else-if="tag === 'city'" class="bg-city" :tag="tag" mode="delete" />
        <CardTag v-else-if="tag === 'robot'" class="bg-robot" :tag="tag" mode="delete" />
        <CardTag v-else-if="tag === 'sound'" class="bg-sound" :tag="tag" mode="delete" />
        <CardTag v-else-if="tag === 'mars'" class="bg-mars" :tag="tag" mode="delete" />
        <CardTag v-else-if="tag === 'meditation'" class="bg-meditation" :tag="tag" mode="delete" />
        <CardTag v-else-if="tag === 'festival'" class="bg-festival" :tag="tag" mode="delete" />
        <CardTag v-else-if="tag === 'interactive map'" class="bg-interactive-map" :tag="tag" mode="delete" />
        <CardTag v-else-if="tag === 'picture'" class="bg-picture" :tag="tag" mode="delete" />
        <CardTag v-else-if="tag === 'maps'" class="bg-maps" :tag="tag" mode="delete" />
        <CardTag v-else-if="tag === 'museum'" class="bg-museum" :tag="tag" mode="delete" />
        <CardTag v-else :tag="tag" mode="delete"/>
      </template>
  </div>
</template>