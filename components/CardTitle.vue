<script setup>
const props = defineProps({
  title: {
    Type: String
  }
})

const formatTitle = () => {
  if (props.title != null && props.title.length > 30) {
    return (props.title.substring(0, 30) + '...')
  } else {
    return props.title
  }
}
</script>

<template>
<div class="text-xs md:text-sm mt-2">
  {{ formatTitle() }}
</div>
</template>