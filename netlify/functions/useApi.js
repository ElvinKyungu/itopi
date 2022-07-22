const fetch = require("node-fetch");

const URL = process.env.AIRTABLE_URL
const KEY = process.env.AIRTABLE_KEY

const requestOptions = {
  method: 'GET',
  redirect: 'follow'
}

const callApi = async (params) => {
  try {
    let result = []
    let offset = 0
    while (offset != null) {
      const response = await fetch(URL + params + '?view=View%20special&offset=' + offset + '&api_key=' + KEY, requestOptions)
      const json = await response.json()
      offset = json.offset
      result = result.concat(json.records)
      await new Promise(r => setTimeout(r, 200))
    }
    console.log('result', result)
    return { statusCode: 200, body: JSON.stringify({ result: result }) }
  }
  catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error }) }
  }
}

exports.handler = async (event, context) => callApi('/entries')