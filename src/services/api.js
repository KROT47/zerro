const DEFAULT_TOKEN = process.env.REACT_APP_TOKEN
const DOMAIN = process.env.REACT_APP_DOMAIN + 'test/?token='

const zenApi = {}
zenApi.getData = (callback, params) => {
  const defaultParams = {
    lastSync: 0,
    token: DEFAULT_TOKEN,
    changed: {}
  }
  params = { ...defaultParams, ...params }
  const body = {
    ...{
      currentClientTimestamp: Math.round(Date.now() / 1000),
      lastServerTimestamp: params.lastSync
    },
    ...params.changed
  }

  const options = {
    method: 'POST',
    body: JSON.stringify(body)
  }
  fetch(DOMAIN + params.token, options)
    .then(res => res.json())
    .then(json => {
      callback(json)
    })
    .catch(err => console.warn(err))
}

zenApi.auth = callback => {
  setTimeout(callback(DEFAULT_TOKEN), 500)
}

export default zenApi