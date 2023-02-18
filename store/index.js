import { defineStore } from 'pinia'
// import useApi from '~~/netlify/edge-functions/useApi' 

const getTags = (tags, newTags) => {
  for (let tag of tags) {
    if (newTags.includes(tag) === false) {
      newTags.push(tag)
    }
    return newTags
  }
}

export const useStore = defineStore({
  id: 'store',
  state: () => {
    return {
      loading: true,
      data: null,
      searchWord: '',
      filteredProject: null,
      project: null,
      sort: { name: 'Relevance', field: null, reverse: false },
      grid: true,
      filter: [],
      tags: [],
      favorite: false,
      favoriteArray: [],
      modalOpen: false,
      alert: false,
      blur: false,
      locale: { en: false, fr: false}
    }
  },
  getters: {
    getProject: (state) => {
      return (id) => {
        if (state.data != null ) {
          return state.data.find(project => project.id === id)
        }
        return null
      }
    }
  }, 
  actions: {
    setTags(data) {
      let newTags = []
      for (let project of data) {
        if (project.fields.hasOwnProperty('tages')) {
          newTags = getTags(project.fields.tags, newTags)
        }
        if (project.fields.hasOwnProperty('installationType')) {
          newTags = getTags(project.fields.installationType, newTags)
        }
      }
      this.tags = newTags
    },
    async setData(url) {
      try {
        const response = await fetch('/.netlify/functions/useApi')
        const json = await response.json()
        const data = json.result
        this.loading = false
        if (data[0] != null) {
          this.data = data
          this.setTags(data)
        }
      } catch (error) {
        console.log('init data', error)
      }

    }
  },
})