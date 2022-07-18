<script setup>
const props = defineProps({
  id: {
    Type: String
  },
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

const router = useRouter()

const projectPage = () => {
  router.push({ path: '../project/' + props.id })
}
</script>

<template>
<div v-on:click="projectPage" id="project_card" class="h-96 w-64 m-5 bg-white outline outline-[3px] outline-black rounded-xl overflow-hidden">
  <div class="h-64 w-full rounded-t-xl">
    <ImageLazy :img="img"/>
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