<script setup>
defineProps({
  title: {
    Type: String
  }
})
</script>

<template>
<div class="text-sm font-sans font-light mt-2">
  {{ title }}
</div>
</template>