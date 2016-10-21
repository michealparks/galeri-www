let text = {
  'MacIntel': 'Mac',
  'Win32': 'PC'
}[navigator.platform]

function setPlatformText () {
  if (text) return Array.prototype.slice.call(
    document.getElementsByClassName('platform')
  ).forEach(el => {
    el.textContent = text
  })
}

module.exports = setPlatformText
