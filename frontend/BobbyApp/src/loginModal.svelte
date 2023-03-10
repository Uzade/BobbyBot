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
		<div>
			<label for="username">Username</label>
			<input bind:value={username} id="username">
		</div>
		<div>
		<label for="password">Password</label>
		<input bind:value={password} id="password" type="password">
		</div>
		<button type="submit">Login</button>
        <button on:click={loadRegister}>Register</button>
	</form>
</ModalTemplate>

<style>
    label{
		color: white;
	}
	button{
		background: linear-gradient(45deg, rgb(113, 0, 206), rgb(255, 0, 200));
		color: white;
		margin: 2rem;
		padding: 1rem;
		border-style: none;
		cursor: pointer;
		line-break: auto;
	}
	h1 {
		background: -webkit-linear-gradient(45deg, rgb(113, 0, 206), rgb(255, 0, 200));
		-webkit-background-clip: text;
 		-webkit-text-fill-color: transparent;
		/*text-shadow: 1px 1px 1px red, 2px 2px 1px red;*/
		font-size: 4em;
		font-weight: 100;
	}

</style>