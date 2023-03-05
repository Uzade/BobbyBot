<script lang="ts">
    import ModalTemplate from "./modalTemplate.svelte";
    import { sendLogin } from "./functions/sendLogin";

    let username: string;
    let password: string;

    export let isVisible=true;
    export let isRegisterVisible: boolean;

    const loadRegister= ()=>{
        isVisible=false;
        isRegisterVisible=true;
    }
</script>

<ModalTemplate>
    <h1>Login</h1>
    <form on:submit|preventDefault={() => sendLogin(username, password)}>
		<label for="username">Username</label>
		<input bind:value={username} id="username">
		<label for="password">Password</label>
		<input bind:value={password} id="password" type="password">
		<br/>
		<button type="submit">
			Login
		</button>
        <button on:click={loadRegister}>Registrieren</button>
	</form>
</ModalTemplate>

<style>
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

</style>