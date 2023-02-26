<script lang="ts">

	let name: string = '';
	let amount: string = '';
	let answer: Promise<Response>;
	const sendRequest = () => {
		answer=fetch(`http://127.0.0.1:8081/sendMessage?name=${name}&amount=${amount}`)		
	}
	
</script>

<main>
	<h1>Send Bobby Food!</h1>
	<form on:submit|preventDefault={sendRequest}>
		<label for="name">Dein Name:</label>
		<input bind:value={name} id="name">
		<label for="amount">Wie viel Leckerlies soll Bobby bekommen?</label>
		<input bind:value={amount} id="value">
		<br/>
		<button type="submit">
			Send to Bobby
		</button>
		{#if answer!=undefined}
			{#await answer}
				<p>Die Opfergabe(n) werden teleportiert!</p>
			{:then value}
				{#if value.status==400}
					 <p>Scotty warum bin ich nur halb Teleportier? Fülle beide Felder aus!</p>
				{:else}
					<p>Opfergabe übermittelt!</p>
				{/if}
			{:catch error}
				<p>Scotty was ist passiert? Error: {error}</p>
			{/await}
		{/if}
		
	</form>
</main>

<style>
	:global(html){
		background-color: rgb(15, 15, 15);
	}
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	p{
		color:white;	
	}
	label{
		color: white;
	}
	input{
		border-color: rgb(44, 44, 44);
		background-color: black;
		color:white;
		margin: 1rem;
	}
	button{
		background: linear-gradient(15deg, rgb(113, 0, 206), rgb(255, 0, 200));
		color: white;
		margin: 2rem;
		padding: 1rem;
		border-style: none;
		cursor: pointer;
	}
	h1 {
		color: #fd41e4;
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