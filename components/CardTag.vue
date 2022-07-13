<script setup>
defineProps({
  tag: {
    Type: String
  }
})
</script>

<template>
<div class="w-fit bg-red-200 rounded-full px-2 py-1 m-1 text-[0.50rem] text-white font-sans font-bold">
  {{ tag }}
</div>
</template>