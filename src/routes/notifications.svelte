<!-- MANCANO:
- STILE PAGINA NOTIFICHE
- FETCH PERIODICO E AGGIORNAMENTO DELLE NOTIFICHE QUANDO UNO SCRIPT VIENE AGGIORNATO
-->


<script>
    import { user } from '$lib/stores';
    import { loadAllNotifs } from '$lib/functions/notifications.js';
    import { Moon } from 'svelte-loading-spinners';
    let notifications = [];
    if($user){
        // Getting both read and unread notifs
        notifications = loadAllNotifs($user.id)
    }
</script>

<div id="page">
    <h1>Notifications</h1>
    {#await notifications}
        <div id="loader" class="loader"><Moon size="50" color="#FF2D55" unit="px" duration="1s"></Moon></div>
    {:then notifications} 
        {#if notifications.length > 0}
            {#each notifications as notif}
                <p>{notif.scriptName} has been updated!</p>
            {/each}
        {:else}
            <p class="not_found">No notifications yet!</p>
        {/if}
    {/await}
</div>