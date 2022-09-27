<script setup>
import { onBeforeRouteUpdate } from 'vue-router'
import { useStore } from '../../store/index.js'
import { getTags } from '../../tools/utils'
import Fuse from 'fuse.js'

const store = useStore()
const route = useRoute()
const router = useRouter()

const options = {
  ignoreLocation: true,
  isCaseSensitive: false,
  findAllMatches: true,
  includeScore: true,
  shouldSort: true,
  includeMatches: true,
  threshold: 0.3,
  keys:['fields.Name', 'fields.Artiste', 'fields.Mots_clefs']
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
      if(Object.entries(item.fields).length !== 0) {
        newData.push({ item: item })
      }
    }
  }
  return newData
}

const filterData = (data) => {
  const filteredData = []
  for (let project of data) {
    if (!store.favorite || (store.favorite && store.favoriteArray.includes(project.item.id))) {
      if (store.filter.length > 0) {
        const tags = getTags(project)
        for (let tag of tags) {
          if (store.filter.includes(tag)) {
            filteredData.push(project)
            break
          }
        }
      } else {
        filteredData.push(project)
      }
    }
  }
  return filteredData
}

const sortData = (data) => {
  if (store.sort.field != null) {
    return data.sort((a, b) => {
      if(a.item.fields[store.sort.field] === undefined){
        a.item.fields[store.sort.field] = ''
      } else if(b.item.fields[store.sort.field] === undefined) {
        b.item.fields[store.sort.field] = ''
      }
        const fields = [a.item.fields[store.sort.field].toString().toUpperCase(), b.item.fields[store.sort.field].toString().toUpperCase()]
        if(fields[0] > fields[1]) return 1
        if(fields[0] < fields[1]) return -1
        return 0
      }
    )
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
    filteredData = filterData(filteredData)
    filteredData = sortData(filteredData)
    if (store.sort.reverse) {
      filteredData.reverse()
    }
  }

  return filteredData
})

const goHome = () => {
  router.push({ path: '/search/' + '', query: { filter: store.filter, favorite: false }})
}

watchEffect(() => {
  let dataIds = []
  if (filteredData.value != null) {
    for (let project of filteredData.value) {
      dataIds.push(project.item.id)
    }
  }
  store.filteredProject = dataIds
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
<section id="search" class="px-5 md:px-10 pt-16 relative">
  <ProjectView v-if="store.project" />
  <BackToTop />
  <FilterBar />
  <GridView v-show="store.grid === true" :filteredData="filteredData" />
  <ListView v-show="store.grid === false" :filteredData="filteredData" />
  <div v-show="store.loading === false && (filteredData == null || filteredData.length === 0)" class="py-12 w-full flex justify-center items-center">
    <div class="h-fit text-black text-xl font-semibold">Pas de résultat pour cette recherche
      <div class="flex space-x-2 justify-center mt-2">
        <div>
          <button type="button" class="inline-block px-6 py-3 bg-slate-300 text-gray-700 font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-slate-200 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out" @click="goHome">page d'accueil</button>
        </div>
    </div>
  </div>
  </div>
</section>
</template>