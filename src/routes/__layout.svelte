<script>
  import '$lib/style/main.css'
  import { user } from "$lib/stores";
  import { Modals, closeModal } from 'svelte-modals'
  import Notifications from 'svelte-notifications';
  import Navbar from '../components/Navbar.svelte';
  import Sidebar from '../components/Sidebar.svelte';
  import supabase from "$lib/db";
  supabase.auth.onAuthStateChange((event, session) => {
    if(event == 'SIGNED_IN'){
      $user = session.user
    }
  })
</script>

<Notifications>
<Sidebar />
<Navbar />
<slot></slot>
<Modals>
  <div
    slot="backdrop"
    class="backdrop"
    on:click={closeModal}
  />
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