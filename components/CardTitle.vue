<script setup>
const props = defineProps({
  title: {
    Type: String
  }
})

const formatTitle = () => {
  if (props.title != null && props.title.length > 27) {
    return (props.title.substring(0, 27) + '...')
  } else {
    return props.title
  }
}
</script>

<template>
<div class="text-xs md:text-sm mt-2 pr-3 md:pr-7">
  {{ formatTitle() }}
</div>
</template>