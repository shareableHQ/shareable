<script>
   import { user } from '$lib/stores';
   import { goto } from "$app/navigation";
   import { browser } from '$app/env';
   import ScriptBox from '$components/ScriptBox.svelte';
   import { Moon } from 'svelte-loading-spinners';
   if(browser && !$user){
      goto('/')
   }
   export let data, scripts;
   let starred = [];
   let starredIDs = []
   data.forEach(star => {
      if(star.stargazer == $user.id){ starredIDs.push(star.script_starred) }
   });
   starredIDs = starredIDs.reverse()
   starredIDs.forEach(star=>{
      var script = scripts.filter(item=>{
         return item.id == star
      })
      starred.push(script[0])
   })
</script>

<div id="loader" class="loader"><Moon size="50" color="#FF2D55" unit="px" duration="1s"></Moon></div>
<h1>Starred</h1>
<div class="scripts-container">
   {#each starred as script}
      <ScriptBox script={script} />
   {/each}
</div>


<style>
   .loader{
      display: none;
   }
</style>