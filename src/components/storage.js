module.exports = {get: get, set: set}

/* global localStorage */
const noStore = !(function storageAvailable (type) {
  try {
    const x = '__x__'
    localStorage.setItem(x, x)
    localStorage.removeItem(x)
    return true
  } catch (e) {
    return false
  }
})()

function get (key) {
  return noStore ? undefined : JSON.parse(localStorage.getItem(key))
}

function set (key, val) {
  return noStore ? undefined : localStorage.setItem(key, JSON.stringify(val))
}
