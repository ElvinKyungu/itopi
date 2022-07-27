<script setup>
defineProps({
  video: {
    Type: Object,
    default(rawProps) {
      return { url: null, type: null }
    }
  }
})
</script>

<template>
<div id="file-video" class="bg-black rounded-lg overflow-hidden mt-2">
  <video controls class="h-96 w-full">
    <source :src="video[0].url"
      :type="video[0].type">
  </video>
</div>
</template>