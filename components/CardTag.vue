<script setup>
import { useStore } from '../store/index.js'

const props = defineProps({
  tag: {
    Type: String
  },
  mode: {
    Type: String
    //card, add, delete
  }
})

const store = useStore()
const router = useRouter()

const addFilter = (tag) => {
  const filter = [...store.filter]
  if (filter.includes(tag)){
    const index = filter.indexOf(tag)
    filter.splice(index)
  } else {
    filter.push(tag)
  }
  router.push({ path: '/search/' + store.searchWord, query: { filter: filter }})
}

const deleteFilter = (tag) => {
  const filter = [...store.filter]
  if (filter.includes(tag)){
    const index = filter.indexOf(tag)
    filter.splice(index)
  }
  router.push({ path: '/search/' + store.searchWord, query: { filter: filter }})
}

const cardAction = () => {
  if (props.mode === 'add') {
    addFilter(props.tag)
  } else if (props.mode === 'delete') {
    deleteFilter(props.tag)
  }
}
</script>

<template>
<div v-on:click="cardAction" class="w-fit bg-red-100 rounded-md border border-black py-1 px-2 m-1 text-[0.52rem] text-black font-sans">
  <span v-if="mode === 'delete'" class="text-[0.60rem]">x </span>{{ tag }}
</div>
</template>