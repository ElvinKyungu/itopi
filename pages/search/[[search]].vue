<script setup>
import { onBeforeRouteUpdate } from 'vue-router'
import { useStore } from '../../store/index.js'
import Fuse from 'fuse.js'

const store = useStore()
const route = useRoute()

const options = {
  ignoreLocation: true,
  isCaseSensitive: false,
  findAllMatches: true,
  includeScore: true,
  shouldSort: true,
  includeMatches: true,
  threshold: 0.3,
  keys:['fields.Name', 'fields.Notes', 'fields.Mots_clefs']
}

const setParams = (url) => {
  store.searchWord = url.params.search
  if (url.query.filter != null) {
    if (Array.isArray(url.query.filter)) {
      store.filter =  url.query.filter
    } else {
      store.filter = [ url.query.filter ]
    }
  } else {
    store.filter = []
  }
  if (url.query.hasOwnProperty('project')) {
    store.project = url.query.project
  } else {
    store.project = null
  }
  if(url.query.hasOwnProperty('favorite') &&  url.query.favorite === 'true') {
    store.favorite = true
  } else {
    store.favorite = false
  }
}

const formatData = (data) => {
  const newData = []
  if (Array.isArray(data)) {
    for (let item of data) {
      newData.push({ item: item })
    }
  }
  return newData
}

const sortData = (data) => {
  if (store.sort.field != null) {
    return data.sort((a, b) => {
      const fields = [a.item.fields[store.sort.field], b.item.fields[store.sort.field]]
      let result = true
      if (fields[0] == null) {
        return false
      } else if (fields[0] == null) {
        return true
      } else {
        return fields[0].localeCompare(fields[1], undefined, {
          numeric: true,
          sensitivity: 'base'
        })
      }
    })
  }
  return data
}

const filteredData = computed(() => {
  let filteredData = []
  if (store.data != null) {
    if (store.searchWord === '') {
      const result = formatData(store.data)
      filteredData = result
    }
    else {
      options.minMatchCharLength = store.searchWord.length
      const fuse = new Fuse(store.data, options)
      filteredData = fuse.search(store.searchWord)
    }
    filteredData = sortData(filteredData)
  }
  if (store.sort.reverse) {
    filteredData.reverse()
  }
  return filteredData
})


onBeforeRouteUpdate((to, from) => {
  setParams(to)
})

onMounted(() => {
  setParams(route)

  const favorite = localStorage.getItem('top1000-favorite')
  if (favorite !== 'null') {
    store.favoriteArray = favorite.split(',')
  }
})

onUnmounted(() => {
  localStorage.setItem('top1000-favorite', store.favoriteArray)
})
</script>

<template>
<section id="index" class="px-10 pt-16 relative z-10">
  <ProjectView v-if="store.project"/>
  <SearchBar />
  <FilterBar />
  <GridView v-show="store.grid === true" :filteredData="filteredData" />
  <ListView v-show="store.grid === false" :filteredData="filteredData"/>
  <div v-if="filteredData == null || filteredData.length === 0" class="h-80 w-full grid place-content-center">
    <div class="text-black text-xl font-semibold">Pas de résultat pour cette recherche</div>
  </div>
</section>
</template>
