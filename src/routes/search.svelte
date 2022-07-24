<script>
   import { Search } from 'lucide-svelte';
   import ScriptBox from '$components/ScriptBox.svelte';
   import { Moon } from 'svelte-loading-spinners';
   import supabase from '$lib/db';

   export let results = [], query;
   let isSearching = false;
   let hasSearched = false;

   let searchParam = query;
   async function search(){
      isSearching = true
      if(searchParam){
         const { data, error } = await supabase.from('scripts').select('*')
         results = data.filter(element => element.name.toLowerCase().indexOf(searchParam.toLowerCase()) != -1 )
      }else{
         results = []
      }
      isSearching = false
      hasSearched = true;
   }
</script>

<svelte:head>
   <title>Shareable | Search</title>
</svelte:head>


<div id="loader" class="loader"><Moon size="50" color="#FF2D55" unit="px" duration="1s"></Moon></div>
<div id="page">
   <form class="searchBar" on:submit|preventDefault={search}>
      <input bind:value={searchParam} class="seachForm" type="text" name="search" id="" placeholder="Search">
      <button type="submit" class="toolButton searchButton icon"><Search /></button>
   </form>
   {#if isSearching}
      <div id="loader" class="loader"><Moon size="50" color="#FF2D55" unit="px" duration="1s"></Moon></div>
   {:else}
      {#if results.length > 0}
         <h2>Search results</h2>
         <div class="scripts-container">
            {#each results as script}
               <ScriptBox script={script} />
            {/each}
         </div>
      {:else}
         {#if hasSearched}
            <p class="not_found">No results!</p>
         {/if}
      {/if}
   {/if}
	
</div>


<style>
   .loader{
      display: none;
   }
   #page{
      padding-top: 50px;
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