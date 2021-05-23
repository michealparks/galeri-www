export const getWikiImages = async (): Promise<string[]> => {
  const srcs = []
  const wikiAPI = 'https://en.wikipedia.org/w/api.php'
  const wikiURL = `${wikiAPI}?action=parse&prop=text&page=Wikipedia:Featured%20pictures/Artwork/Paintings&format=json&origin=*`
  const response = await window.fetch(wikiURL)
  const json = await response.json()
  const template = document.createElement('template')
  template.innerHTML = json.parse.text['*']

  template.content.querySelectorAll<HTMLImageElement>('.gallerybox img').forEach(el => {
    srcs.push(el.src.replace(/[0-9]{3,4}px/, '2000px'))
  })

  return srcs
}
