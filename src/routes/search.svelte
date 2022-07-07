<script context="module">
   import supabase from '$lib/db';
   export async function load({url}){
      const query = url.searchParams.get('q')
      let results = []
      if(query){
         const { data, error } = await supabase.from('scripts').select('*')
         results = data.filter(element => element.name.toLowerCase().indexOf(query.toLowerCase()) != -1 )
      }
      return {props:{results, query}}
   }
</script>

<script>
   import feather from 'feather-icons';
   export let results = [], query;
   import ScriptBox from '$components/ScriptBox.svelte';

   let searchParam = query;
   async function search(){
      if(searchParam){
         const { data, error } = await supabase.from('scripts').select('*')
         results = data.filter(element => element.name.toLowerCase().indexOf(searchParam.toLowerCase()) != -1 )
      }else{
         results = []
      }
   }
</script>

<svelte:head>
   <title>Shareable | Search</title>
</svelte:head>


<div id="page">
   <form class="searchBar" on:submit|preventDefault={search}>
      <input bind:value={searchParam} class="seachForm" type="text" name="search" id="" placeholder="Search">
      <button type="submit" class="toolButton searchButton icon">{@html feather.icons['search'].toSvg()}</button>
   </form>
   {#if results.length > 0}
   <h2>Search results</h2>
      <div class="scripts-container">
         {#each results as script}
            <ScriptBox script={script} />
         {/each}
      </div>
   {:else}
   <p class="not_found">No results!</p>
   {/if}
	
</div>


<style>
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