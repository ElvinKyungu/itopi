<script setup>
defineProps({
  title: {
    Type: String
  }
})
</script>

<template>
<div class="text-xs md:text-sm mt-2 pr-3 mdpr-7">
  {{ title }}
</div>
</template>