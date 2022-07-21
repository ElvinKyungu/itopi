<script setup>
defineProps({
  title: {
    Type: String
  }
})
</script>

<template>
<div class="text-sm mt-2 pr-7">
  {{ title }}
</div>
</template>