<script setup>
import { useStore } from './store/index.js'

const store = useStore()
store.setData()
</script>

<template>
  <div>
    <NuxtPage/>
  </div>
</template>
