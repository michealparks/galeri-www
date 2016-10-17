/* global localStorage */
const noStore = !storageAvailable('localStorage')

function storageAvailable (type) {
  try {
    const storage = window[type]
    const x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) { return false }
}

function get (key) {
  return noStore ? null : JSON.parse(localStorage.getItem(key))
}

function set (key, val) {
  return noStore ? null : localStorage.setItem(key, JSON.stringify(val))
}

module.exports = { get, set }
