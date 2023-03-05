<script lang="ts">

    export let answer:Promise<Response>;    

</script>


<div>
    {#if answer!=undefined}
        {#await answer}
            <p>Die Opfergabe(n) werden teleportiert!</p>
        {:then value}
            {#if value.status==400}
                <p>Scotty warum bin ich nicht Teleportiert? Du hast keine Leckerlies mehr übrig!</p>
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