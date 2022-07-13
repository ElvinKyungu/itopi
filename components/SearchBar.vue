<script setup>
import { useStore } from '../store/index.js'

const store = useStore()
const input = ref('')

const search = () => {
  store.searchWord = input.value
}
</script>

<template>
<div class="h-12 w-full border-b-[3px] border-black flex justify-end">
  <input class="w-64 border-l-[3px] border-black px-5" placeholder=" _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _" v-model="input"/>
  <div v-on:click="search" class="w-32 border-l-[3px] border-black grid place-content-center">Search</div>
</div>
</template>