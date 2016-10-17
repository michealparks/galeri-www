function requestJSON (url, onerror, onload) {
  const req = new window.XMLHttpRequest()
  req.open('GET', url, true)
  req.responseType = 'json'
  req.onerror = onerror
  req.onload = onload
  return req.send()
}

module.exports = { requestJSON }
