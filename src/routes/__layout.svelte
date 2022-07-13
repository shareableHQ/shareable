<script context="module">
  import supabase from "$lib/db";
  export async function load(){
    console.log('hi from load')
    let isMaintenance = await supabase.from('meta').select('isMaintenance').eq('id', 1);
    isMaintenance = isMaintenance.data[0].isMaintenance
    return {props:{isMaintenance}}
  }
</script>

<script>
  import '$lib/style/main.css'
  import { user } from "$lib/stores";
  import { Modals, closeModal } from 'svelte-modals'
  import Notifications from 'svelte-notifications';
  import Navbar from '../components/Navbar.svelte';
  import Sidebar from '../components/Sidebar.svelte';
  export let isMaintenance;
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
  import { browser } from '$app/env';
  import { endLoad } from '$lib/functions/utils';
  $:{
      console.log($loading)
      if(browser){
         setTimeout(() => {
            endLoad()
         }, 1000);
      }
   }
</script>

<Notifications>
<Sidebar />
<Navbar />
{#if isMaintenance}
  <p class="not_found">Website is currently under maintenance. Should be up again in a few moments!<br><br>Sorry!</p>
{:else}
  <slot></slot>
{/if}
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