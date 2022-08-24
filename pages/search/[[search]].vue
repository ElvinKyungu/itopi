<script setup>
import { onBeforeRouteUpdate } from 'vue-router'
import { useStore } from '../../store/index.js'
import { getTags } from '../../tools/utils'
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
      const fields = [a.item.fields[store.sort.field], b.item.fields[store.sort.field]]
      let result = true
      if (fields[0] == null) {
        return false
      } else if (fields[0] == null) {
        return true
      } else {
        return fields[0].localeCompare(fields[1], undefined, {
          numeric: true,
          sensitivity: 'base',
          ignorePunctuation: true
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
    filteredData = filterData(filteredData)
    filteredData = sortData(filteredData)
    if (store.sort.reverse) {
      filteredData.reverse()
    }
  }
  
  return filteredData
})

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

  // Get the button
  let mybutton = document.getElementById('btn-back-to-top')

  // When the user scrolls down 350px from the top of the page, show the button
  window.onscroll = function () {
    return (window.scrollY > 350 ? mybutton.style.display = 'block' : mybutton.style.display = 'none')
  }
})

  // When the user clicks on the button, scroll to the top of the page
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

onUnmounted(() => {
  localStorage.setItem('top1000-favorite', store.favoriteArray)
})

</script>

<template>
<section id="search" class="px-5 md:px-10 pt-16 relative">
  <ProjectView v-if="store.project" />
  <div>
    <button
    type="button"
    class="inline-block z-30 p-3 bg-red-500 opacity-75 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out bottom-5 right-5 fixed hidden"
    id="btn-back-to-top"
    @click="backToTop">
    <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    class="w-4 h-4"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path
      fill="currentColor"
      d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
    >
    </path>
    </svg>
    </button>
  </div>
  <FilterBar />
  <GridView v-show="store.grid === true" :filteredData="filteredData" />
  <ListView v-show="store.grid === false" :filteredData="filteredData" />
  <div v-show="store.loading === false && (filteredData == null || filteredData.length === 0)" class="py-12 w-full flex justify-center items-center">
    <div class="h-fit text-black text-xl font-semibold">Pas de résultat pour cette recherche</div>
  </div>
</section>
</template>