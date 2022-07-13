<script setup>
defineProps({
  title: {
    Type: String
  },
  artiste: {
    Type: String
  },
  img: {
    Type : String
  },
  tags: {
    Type: Array,
    default(rawProps) {
        return []
      }
    }
})
</script>

<template>
<div id="project_card" class="h-96 w-64 m-5 bg-white outline outline-[3px] outline-black rounded-xl overflow-hidden">
  <div class="h-64 w-full rounded-t-xl">
    <img :src="img" class="h-full w-full object-cover"/>
  </div>
  <div class="border-t-[3px] border-black px-2">
    <CardTitle :title="title"/>
    <CardTitle :title="artiste"/>
    <div class="mt-2 flex flex-wrap">
      <CardTag v-for="(tag, index) in tags" :key="index" :tag="tag" />
    </div>
  </div>
</div>
</template>