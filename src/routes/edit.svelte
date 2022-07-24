<script context="module">
   import supabase from '$lib/db';
   export async function load({url}){
      const scriptID = url.searchParams.get('id')
      let error = null
      let authorID;
      let data;
      let script;
      try{
         authorID = supabase.auth.user().id
      }catch{}
      data = await supabase.from('scripts').select('*').eq('id', scriptID).eq('author_id',authorID)      
      if(!data || data.error){
         error = 'Missing authorization'
      }else{
         script = data.data[0]
      }
      return {props:{scriptID, error, script}}
   }
</script>

<script>
   import { Moon } from 'svelte-loading-spinners';
   import { goto } from "$app/navigation";
   import { browser } from '$app/env'
   import { user } from "$lib/stores";
   import { updateTitle, updateDesc, updateType, removeScript } from '../lib/functions/editScript';
   import Select from 'svelte-select';
   import { Trash2 } from 'lucide-svelte';
   import Breadcrumbs from '$components/Breadcrumbs.svelte'
   export let scriptID
   export let error
   export let script
    
   let title, desc, type;
   
   let parameter = 'Title';
   if(script){
      title = script.name;
      desc = script.desc;
      type = script.type
   }

   function handleSelect(event){
      parameter = event.detail.value
   }
   function handleSelect2(event){
      type = event.detail.value
   }
   async function invokeUpdateTitle(){
      let res = await updateTitle(script.id, title)
      if(res){
         alert(res.message)
      }else{
         goto('/script/' + scriptID)
      }
   }
   async function invokeUpdateDesc(){
      let res = await updateDesc(script.id, desc)
      if(res){
         alert(res.message)
      }else{
         goto('/script/' + scriptID)
      }
   }
   async function invokeUpdateType(){
      let res = await updateType(script.id, type)
      if(res){
         alert(res.message)
      }else{
         goto('/script/' + scriptID)
      }
   }
   async function invokeRemoveScript(){
      let res = await removeScript(script.id)
      if(res){
         alert(res.message)
      }else{
         goto('/script/' + scriptID)
      }
   }
   
   
   if(browser && error || browser && !$user){
      goto('/script/' + scriptID)
   }
   let scriptLink = '/script/' + scriptID
   let path = [{name:'Home', url:'/', last:false}, {name:title, url: scriptLink, last:false}, {name:'Edit' ,url:'', last:true}]
</script>


<div id="loader" class="loader"><Moon size="50" color="#FF2D55" unit="px" duration="1s"></Moon></div>
<div id="page">
   <Breadcrumbs path={path} />
   <h1>Edit script</h1>
   <div>
      <div class="themed"><Select value="Title" placeholder="What do you want to edit?" on:select={handleSelect} items={['Title', 'Description', 'Type', 'Remove script']}></Select></div>
      <p class="label">Choose what you want to edit.</p>
      <br>
      {#if parameter != 'Remove script'}<h2>Edit {parameter}</h2>{:else}<h2>{parameter}</h2>{/if}
      {#if parameter == 'Title'}
         <form on:submit|preventDefault={invokeUpdateTitle}>
            <input type="text" class="form" placeholder="Script name" required="required" bind:value={title}><br><br>
            <button id="submitButton" type="submit" class="toolButton redBrandButton">Edit</button>
         </form>
      {:else if parameter == 'Description'}
         <form on:submit|preventDefault={invokeUpdateDesc}>
            <input type="text" class="form desc" placeholder="A brief description of your script" required="required" maxlength="100" bind:value={desc}>
            <p class="label">Description of your script</p>
            <button id="submitButton" type="submit" class="toolButton redBrandButton">Edit</button>
            <br><br>
         </form>
      {:else if parameter == 'Type'}
         <form on:submit|preventDefault={invokeUpdateType}>
            <div class="themed"><Select value={type} placeholder="Select type" on:select={handleSelect2} items={['Script', 'Home Screen Widget', 'Lock Screen Widget']}></Select></div><br>
            <button id="submitButton" type="submit" class="toolButton redBrandButton">Edit</button>
         </form>
      {:else if parameter == 'Remove script'}
      <div class="contents"><button on:click={invokeRemoveScript} class="icon toolButton redBrandButton"><Trash2 /> Delete</button></div>
      {/if} 
</div>
</div>


<style>
   .loader{
      display: none;
   }
   .desc{
      width:50%
   }
</style>