<script setup>
const props = defineProps({
  img: {
    Type: String
  }
})

const loaded = ref(false)

if (props.img == null) {
  loaded.value = true
}
</script>


<template>
  <div class="h-full w-full bg-slate-100" v-bind:class="{ 'animate-pulse': !loaded, 'animate-fade-out-background': loaded }">
    <img
      :src="img"
      loading="lazy"
      class="h-full w-full object-cover"
      v-bind:class="{ 'animate-fade-in visible': loaded && img, 'invisible': !loaded || !img }"
      @load="loaded = true"
    />
  </div>
</template>