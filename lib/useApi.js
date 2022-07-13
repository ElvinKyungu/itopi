import ky from 'ky'

const URL = import.meta.env.VITE_AIRTABLE_URL
const KEY = import.meta.env.VITE_AIRTABLE_KEY
const callApi = async (params) => {
  try {
    let result = []
    let offset = 0
    while (offset != null) {
      const json = await ky.get(URL + params + '?view=View%20special&offset=' + offset + '&api_key=' + KEY, { timeout: 30000 }).json()
      offset = json.offset
      result = result.concat(json.records)
      await new Promise(r => setTimeout(r, 200))
    }
    return result
  }
  catch (error) {
    return null
  }
}

const getData = async () => callApi('/entries')

export { getData }