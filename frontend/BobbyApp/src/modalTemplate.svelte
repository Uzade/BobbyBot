<script lang="ts">
    import { onMount } from "svelte"
    
    let modal: any

    onMount(() => {
        modal = document.getElementById("modal")
        modal!.showModal()
    })
</script>

<dialog id="modal">
    <slot>Error: Contend could not be loaded</slot>
</dialog>

<style>
    dialog{
        color: white;
        width: 60%;
        background-color: rgb(25, 25, 25);
        border: 0;
    }

    dialog::backdrop{
        background-color: rgb(15, 15, 15);
        opacity: 1;
    }
</style>