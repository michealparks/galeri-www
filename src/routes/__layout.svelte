<script lang='ts'>
	import '../app.scss'
	import Icons from '$lib/Icons.svelte'
	import Downloads from '$lib/Downloads.svelte'
	import Background from '$lib/Background.svelte'
</script>

<Icons />
<slot />
 
<footer>
	<Background delay={3000} />
	<h2>Download Galeri</h2>
	<Downloads />
	<small>
		Special thanks to Wikipedia, Rijksmuseum, The Metropolitan Museum of Art, The Guggenheim, and The Cooper
		Hewitt Museum of Design for providing the open material that make projects like this possible.
	</small>
</footer>

<style lang='scss'>
footer {
	position: relative;
	overflow: hidden;
	display: grid;
	place-content: center;
	text-align: center;
	width: 400px;
	height: 400px;
	padding: 20px;
	margin: 0 auto 50px;
	border-radius: 100%;
	box-shadow: -2px 24px 43px -24px rgba(0,0,0,0.75);

	@media(max-width: 800px) {
		width: 300px;
		height: 300px;
	}
}

h2 {
	margin: 0 0 5px 0;
}
</style>
