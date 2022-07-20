<script setup>
defineProps({
  title: {
    Type: String
  }
})
</script>

<template>
<div class="text-sm font-sans mt-2">
  {{ title }}
</div>
</template>