<script>
    import supabase from "$lib/db";
    import '$lib/style/main.css'
    import { user } from "$lib/stores";
    import { Modals, closeModal } from 'svelte-modals'
    import Notifications from 'svelte-notifications';
    import Navbar from "../lib/components/Navbar.svelte";
    import Sidebar from "../lib/components/Sidebar.svelte";
    import { loadNotifs, updateNotifs } from '$lib/functions/notifications.js';
    let notifs = [];
    supabase.auth.onAuthStateChange((event, session) => {
      if(event == 'SIGNED_IN'){
        $user = session.user
      }
    })
    import { onMount } from 'svelte';
    onMount(()=>{
      if(!$user && supabase.auth.user()){
        $user = supabase.auth.user()
      }
    })
    import { loading } from '$lib/stores';
    import { browser } from '$app/environment';
    import { endLoad } from '$lib/functions/websiteUtilities';
    $:{
        console.log($loading)
        if(browser){
           setTimeout(() => {
              endLoad()
           }, 1000);
        }
     }
     if($user){
      updateNotifs($user.id)
      notifs = loadNotifs($user.id)
     }
  </script>

<Notifications>
    <Navbar notifications={notifs} />
    <Sidebar />
    <slot></slot>
    <Modals>
        <div slot="backdrop" class="backdrop" on:click={closeModal} />
    </Modals>
</Notifications>
      
      
<style>
.backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0,0,0,0.50)
}
</style>
