<script setup>
defineProps({
  text: {
    Type: String
  }
})
</script>

<template>
  <span class="border border-black py-5 overflow-hidden pl-2 text-ellipsis whitespace-nowrap">{{ text }}</span>
</template>