<script>
  import '$lib/style/main.css'
  import { user } from "$lib/stores";
  import { Modals, closeModal } from 'svelte-modals'
  import Navbar from '../components/Navbar.svelte';
  import Sidebar from '../components/Sidebar.svelte';
  $: console.log($user);
</script>

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