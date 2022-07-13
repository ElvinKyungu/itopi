import { defineStore } from 'pinia'
import { getData } from '../lib/useApi'

export const useStore = defineStore({
  id: 'store',
  state: () => {
    return {
      data: {},
      searchWord: ''
    }
  },
  getters: {},
  actions: {
    async setData() {
      try {
        const data = await getData()
        if (data != null) {
          this.data = data
        }
      }
      catch (error) {
        console.log('init data', error)
      }

    }
  },
})