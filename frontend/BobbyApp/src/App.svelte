<script lang="ts">
  	import ButttonInfo from "./ButttonInfo.svelte";
  	import LoginModal from "./loginModal.svelte";
  	import RegisterModal from "./registerModal.svelte";
  	import { onMount } from "svelte"
  	import { needsReload } from "./functions/needsReload";
  	import { getOpferKonto } from "./functions/getOpferKonto";
	import { sendRequest } from "./functions/sendRequest";
	
	let isLoginVisible=false;
	let isRegisterVisible=false;
	let amount: number = 0;
	let message: string = '';
	let answer: Promise<Response>;
	let kontoStand: number = 0;

	const minOpfer = () => {
		return kontoStand == 0?0:1;
	}

	onMount(async () => {
		isLoginVisible = await needsReload()
		kontoStand = await getOpferKonto()
	});
</script>

<main>
	{#if isLoginVisible}
		<LoginModal bind:isRegisterVisible bind:isVisible={isLoginVisible}/>
	{/if}

	{#if isRegisterVisible}
		<RegisterModal bind:isLoginVisible bind:isVisible={isRegisterVisible}/>
	{/if}

	<h1>Send Bobby Food!</h1>
	<form on:submit|preventDefault={() => sendRequest(amount, message)}>
		<label for="amount">Wie viel Leckerlies soll Bobby bekommen?</label>
		<p>Du kannst {kontoStand} Leckerlie(s) opfern.</p>
		<input type="range" id="amount" name="amount" bind:value={amount} min={minOpfer()} max={kontoStand}> 
		<p>{amount} Leckerlie(s) opfern</p>
		<label for="message">Was ist deine Nachricht?</label>
		<input bind:value={message} id="message">
		<br/>
		<button type="submit">
			Send to Bobby
		</button>
		<ButttonInfo answer={answer}/>
	</form>
</main>

<style>
	:global(html){
		background-color: rgb(15, 15, 15);
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
	}
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
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