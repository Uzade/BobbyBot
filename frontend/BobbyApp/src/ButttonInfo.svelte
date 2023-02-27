<script lang="ts">

    export let answer:Promise<Response>;    

</script>


<div>
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
</div>


<style>
    p{
		color:white;	
	}
</style>