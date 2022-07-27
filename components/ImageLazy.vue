<script setup>
const props = defineProps({
  img: {
    Type: String
  },
  hover: {
    Type: Boolean,
    default: false
  }
})

const loaded = ref(false)

if (props.img == null) {
  loaded.value = true
}
</script>


<template>
  <div class="h-full w-full bg-slate-100 overflow-hidden" v-bind:class="{ 'animate-pulse': !loaded, 'animate-fade-out-background': loaded }">
    <img v-if="img != null"
      :src="img"
      loading="lazy"
      class="h-full w-full object-cover"
      v-bind:class="{ 'animate-fade-in visible': loaded && img, 'invisible': !loaded || !img, 'group-hover:scale-105': hover }"
      @load="loaded = true"
    />
  </div>
</template>