import type { Versions } from './types'

export const getLatestVersions = async (): Promise<Versions> => {
  const url = 'https://api.github.com/repos/michealparks/galeri-www/releases/latest'
  const response = await fetch(url)
  const json = await response.json()
  const v = json.tag_name

  return {
    href: json.html_url,
    tag: v.slice(1),
    downloads: {
      mac: `https://github.com/michealparks/galeri-www/releases/download/${v}/Galeri-${v}.dmg`,
      win: `https://github.com/michealparks/galeri-www/releases/download/${v}/Galeri-${v}.exe`,
    }
  }
}
