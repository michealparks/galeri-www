import { writable } from "svelte/store"
import type { Versions } from "./types"

export const images = writable<string[]>([])

export const versions = writable<Versions>({
  href: '',
  tag: '',
  downloads: {
    mac: '',
    win: ''
  }
})
