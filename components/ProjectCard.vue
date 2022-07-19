<script setup>
import { useStore } from '../store/index.js'

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
const store = useStore()

const projectPage = () => {
  store.project =  props.id
  router.push({ path: '/search/' + store.searchWord, query: { filter: store.filter, project: store.project }})
}

const showCard = computed(() => {
  if (store.filter.length > 0) {
    for (let tag of props.tags) {
      if (store.filter.includes(tag)) {
        return true
      }
    }
    return false
  }
  return true
})
</script>

<template>
<div v-if="showCard" v-on:click="projectPage" id="project_card" class="h-96 w-64 m-5 bg-white outline outline-[3px] outline-black rounded-xl overflow-hidden">
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