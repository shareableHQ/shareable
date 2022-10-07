<script>
    import ScriptBox from "../../lib/components/ScriptBox.svelte";
    import { browser } from '$app/environment';
    import { tagStore } from '$lib/stores';
    import { endLoad } from '$lib/functions/websiteUtilities'
    import { Moon } from 'svelte-loading-spinners';
    export let data
    let { dbResponse, tag } = data
   $:{
      console.log($tagStore)
      if(browser){
         setTimeout(() => {
            endLoad()
         }, 1000);
      }
   }
</script>



<svelte:head>
   {#if tag != 'All'}
      <title>Shareable | Browse {tag.toLowerCase()}s</title>
   {:else}
      <title>Shareable | Browse all widgets</title>
   {/if}
</svelte:head>


<div id="loader" class="loader"><Moon size="50" color="#FF2D55" unit="px" duration="1s"></Moon></div>
<div id="page">
   {#if tag != 'All'}
      <h1>Browse {tag.toLowerCase()}s</h1>
   {:else}
      <h1>Browse all widgets</h1>
   {/if}
   <div class="scripts-container">
      {#each dbResponse as script}
         <ScriptBox script={script} />
      {/each}
   </div>
</div>

<style>
   .loader{
      display: none;
   }
   #page{
      padding-top: 30px;
      padding-left: 50px;
      padding-right: 40px;
   }
   @media(max-width:550px){
      #page{
         padding-top: 20px;
         padding-left: inherit;
         padding-right: inherit;
      }
   }
</style>