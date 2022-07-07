<script context="module">
   import supabase from '$lib/db';
   export async function load({url}){
      const tag = url.searchParams.get('tag')
      let {data, error} = await supabase.from('scripts').select('*').eq('type', tag)
      data.sort((a, b)=>{
            return a.id - b.id
         })         
      data = data.reverse()
      return {props:{data, tag}}
   }
</script>
<script>
   import { Moon } from 'svelte-loading-spinners';
   import ScriptBox from '$components/ScriptBox.svelte';
   import { browser } from '$app/env';
   import { tagStore } from '$lib/stores';
   import { endLoad } from '$lib/functions/utils';

   export let data, tag

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
   <title>Shareable | Home</title>
</svelte:head>

<div id="loader" class="loader"><Moon size="50" color="#FF2D55" unit="px" duration="1s"></Moon></div>
<div id="page">
   <h1>Browse {tag.toLowerCase()}s</h1>
   <div class="scripts-container">
      {#each data as script}
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