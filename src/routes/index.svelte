<script context="module">
   import supabase from '$lib/db';
   export async function load({url}){
      let {data, error} = await supabase.from('scripts').select('*')
      data.sort((a, b)=>{
            return a.id - b.id
         })         
      data = data.reverse()
      return {props:{data}}
   }
</script>
<script>
   import { user } from "$lib/stores";
   import { Moon } from 'svelte-loading-spinners';
   import { browser } from '$app/env'
   import { startLoad, endLoad } from '$lib/functions/utils';

   export let data


   let recent = data.slice(0, 5);
   console.log(recent)
</script>

<svelte:head>
   <title>Shareable | Home</title>
</svelte:head>

<div id="loader" class="loader"><Moon size="50" color="#FF2D55" unit="px" duration="1s"></Moon></div>
<div id="page">
   <h2>Recent</h2>
   <div class="scripts-container">
      {#each recent as script}
         <div class="script-cell">
            <div class="script-left">
               <p class="script-title">{script.name}</p>
               <p class="script-author-date">{script.desc}</p>
            </div>
            <div class="script-right">
               <a class="script-link" href={"/script/" + script.id}>GET</a>
            </div>
         </div>
      {/each}
	</div>
   

   
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