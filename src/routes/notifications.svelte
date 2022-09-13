<script>
    import { user } from '$lib/stores';
    import { loadAllNotifs, readNotif } from '$lib/functions/notifications.js';
    import { Moon } from 'svelte-loading-spinners';
    import { Bell, BellRing } from 'lucide-svelte';
    let notifications = [];
    if($user){
        // Getting both read and unread notifs
        notifications = loadAllNotifs($user.id)
    }
    async function openNotif(notif){
        if(!notif.seen){
            let read = await readNotif($user.id, notif.script)
        }
        const url = '/script/' + notif.script
        window.location.href = url
    }
</script>

<div id="page">
    <h1>Notifications</h1>
    {#await notifications}
        <div id="loader" class="loader"><Moon size="50" color="#FF2D55" unit="px" duration="1s"></Moon></div>
    {:then notifications} 
        {#if notifications.length > 0}
            {#each notifications as notif}
                <div class="notification" on:click={openNotif(notif)}>
                    <p>
                        <span class="icon" class:unread={!notif.seen}>
                            {#if notif.seen} <Bell /> {:else} <BellRing /> {/if}
                        </span>
                        <b>{notif.scriptName}</b> has been updated!
                    </p>
                </div>
            {/each}
        {:else}
            <p class="not_found">No notifications yet!</p>
        {/if}
    {/await}
</div>


<style>
    .notification{
        font-size: 15px;
        background-color: #333333;
        padding:6px;
        border-radius: 4px;
        margin-bottom: 15px;
    }
    .notification:hover{
        opacity: 0.8;
    }
    .unread{
        color: #FF2D55;
    }
</style>