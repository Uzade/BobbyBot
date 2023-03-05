<script lang="ts">
    import ModalTemplate from "./modalTemplate.svelte";
    export let isVisible=true;
    export let isRegisterVisible;

    let username;
    let password;
    const sendRequest= async ()=>{
        const response= await fetch("http://127.0.0.1:8081/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "UID": username,
                "password": password
            }),
        });
        const passedResponse= await response.json();
        if(response.status==200){
            sessionStorage.setItem("apiKey", passedResponse.apiKey);
            sessionStorage.setItem("UID", username);
            isVisible=false;
            window.location.reload();
        }else{
            username="";
            password="";
        }        
    }
    const loadRegister= ()=>{
        isVisible=false;
        isRegisterVisible=true;
    }
</script>

<ModalTemplate>
    <h1>Login</h1>
    <form on:submit|preventDefault={sendRequest}>
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