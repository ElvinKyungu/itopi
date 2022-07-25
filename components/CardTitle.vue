<script setup>
defineProps({
  title: {
    Type: String
  }
})
</script>

<template>
<div class="text-xs md:text-sm mt-2 pr-3 md:pr-7">
  {{ title }}
</div>
</template>