<script setup>
defineProps({
  text: {
    Type: String
  }
})
</script>

<template>
  <span class="border border-black flex items-center overflow-hidden pl-5">{{ text }}</span>
</template>