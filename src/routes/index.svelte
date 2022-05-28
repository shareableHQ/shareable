<script>
   import { user } from "$lib/stores";
   import { Moon } from 'svelte-loading-spinners';
   import { browser } from '$app/env'
   import { startLoad, endLoad } from '$lib/functions/utils';
</script>

<svelte:head>
   <title>Shareable | Home</title>
</svelte:head>

<div id="loader" class="loader"><Moon size="50" color="#FF2D55" unit="px" duration="1s"></Moon></div>
<div id="page">
   {#if $user}
      <h1><span class="brand">Welcome back</span> {$user.user_metadata.user_name}</h1>
   {:else}
      <h1 class="brand">Home</h1>
   {/if}
</div>


<style>
   .loader{
      display: none;
   }
</style>