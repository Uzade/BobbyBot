<script lang="ts">
  import ButttonInfo from "./ButttonInfo.svelte";
  import LoginModal from "./loginModal.svelte";
  import { onMount } from "svelte"
	
	let isLoginVisible=false;

	let apiKey = sessionStorage.getItem("apiKey");
	let UID = sessionStorage.getItem("UID");
	let amount: number = 1;
	let message: string= '';
	let answer: Promise<Response>;
	let kontoStand: number = 0;

	const sendRequest = () => {
		answer= fetch("http://127.0.0.1:8081/sendMessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "amount": amount,
                "UID": UID,
                "apiKey": apiKey,
				"message": message
            }),
        });
		refresh();	
	}

	const getOpferKonto = async (apiKey: String, UID: String) => {
		const response= await fetch("http://127.0.0.1:8081/konto", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "UID": UID,
                "apiKey": apiKey
            }),
        });
		const passedresponse= await response.json();
		return passedresponse.opferKonto;
	}

	const checkApiKey = async (apiKey: String, UID: String) => {
		const response= await fetch("http://127.0.0.1:8081/keyCheck", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
				"UID": UID,
                "apiKey": apiKey
            }),
        });
		const passedresponse= await response.json();
		return passedresponse.apiKey;
	}
	
	const refresh=  async () => {
        if(apiKey==null || UID==null){
			isLoginVisible=true;
		}else if(!await checkApiKey(apiKey, UID)){
			isLoginVisible=true;
		}
		kontoStand=await getOpferKonto(apiKey, UID);
    }

	onMount(refresh);
</script>

<main>
	{#if isLoginVisible}
		<LoginModal bind:isVisible={isLoginVisible}/>
	{/if}	
	<h1>Send Bobby Food!</h1>
	<form on:submit|preventDefault={sendRequest}>
		<label for="amount">Wie viel Leckerlies soll Bobby bekommen?</label>
		<input type="range" id="amount" name="amount" bind:value={amount} min="1" max={kontoStand}> 
		<p>{amount}</p>
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