<script lang="ts">
	import { onMount } from "svelte"
  import Header from './index/header.svelte'
	import Main from './index/main.svelte'
	import { getWikiImages } from '$lib/images'
	import { getLatestVersions } from "$lib/versions"
	import { images, versions } from "$lib/stores"
	
	onMount(async () => {
		$images = await getWikiImages()
		$versions = await getLatestVersions()
	})
</script>

<svelte:head>
	<title>Galeri</title>
</svelte:head>

<Header />
<Main />
