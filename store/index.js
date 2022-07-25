import { defineStore } from 'pinia'
// import useApi from '~~/netlify/edge-functions/useApi' 


export const useStore = defineStore({
  id: 'store',
  state: () => {
    return {
      data: null,
      searchWord: '',
      project: null,
      sort: { name: 'Pertinence', field: null, reverse: false },
      grid: true,
      filter: [],
      tags: [],
      favorite: false,
      favoriteArray: []
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
      const tags = []
      for (let project of data) {
        if (project.fields.hasOwnProperty('Mots_clefs')) {
          for (let tag of project.fields.Mots_clefs) {
            if (tags.includes(tag) === false) {
              tags.push(tag)
            }
          }
        }
      }
      this.tags = tags
    },
    async setData(url) {
      try {
        const response = await fetch('/.netlify/functions/useApi')
        const json = await response.json()
        const data = json.result
        if (data[0] != null) {
          this.data = data
          this.setTags(data)
        }
      }
      catch (error) {
        console.log('init data', error)
      }

    }
  },
})