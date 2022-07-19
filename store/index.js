import { defineStore } from 'pinia'
import { getData } from '../lib/useApi'

export const useStore = defineStore({
  id: 'store',
  state: () => {
    return {
      data: null,
      searchWord: '',
      filter: [],
      tags: []
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
    async setData() {
      try {
        const data = await getData()
        if (data != null) {
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