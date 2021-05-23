/**
 * Can be made globally available by placing this
 * inside `global.d.ts` and removing `export` keyword
 */
export interface Versions {
	href: string
	tag: string
	downloads: {
		mac: string,
		win: string
	}
}