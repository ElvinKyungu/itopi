<script setup>
const props = defineProps({
  title: {
    Type: String
  }
})

const formatTitle = () => {
  if (props.title != null && props.title.length > 10) {
    return (props.title.substring(0, 10) + '...')
  } else {
    return props.title
  }
}
</script>

<template>
<div class="text-xs md:text-sm">
  {{ formatTitle() }}
</div>
</template>