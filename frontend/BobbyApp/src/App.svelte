<script>

	let name = '';
	let amount = '';

	const sendRequest = () => {
		fetch(`http://127.0.0.1:8081/sendMessage?name=${name}&amount=${amount}`)
	}
	
</script>

<main>
	<h1>Send Bobby Food!</h1>
	<form on:submit|preventDefault={sendRequest}>
		<label for="name">Dein Name:</label>
		<input bind:value={name} id="name">
		<label for="amount">Wie viel Karotten soll Bobby bekommen?</label>
		<input bind:value={amount} id="value">
		<br/>
		<button type="submit">
			Send to Bobby
		</button>
	</form>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>