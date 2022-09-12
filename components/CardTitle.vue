<script setup>
const props = defineProps({
  title: {
    Type: String
  }
})

const formatTitle = () => {
  const titleSize = window.innerWidth > 768 ? 30 : 10
  if (props.title != null && props.title.length > titleSize) {
    return (props.title.substring(0, titleSize) + '...')
  } else {
    return props.title
  }
}
</script>

<template>
<div class="text-xs md:text-sm md:text-ellipsis md:whitespace-nowrap md:overflow-hidden">
  {{ formatTitle() }}
</div>
</template>