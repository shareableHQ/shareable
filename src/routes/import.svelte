<script context="module">
   import { getUserRepo } from '../lib/functions/userActions';
   import supabase from '$lib/db';
   export async function load(){
      let items = []
      let username, id
      try{
         username = supabase.auth.user().user_metadata.user_name
         id = supabase.auth.user().id
         items = await getUserRepo(username)
      }catch{}
      return {props:{items, username, id}}
   }
</script>
<script>
   import Select from 'svelte-select';
   export let items
   import { openModal } from 'svelte-modals'
   import Modal from '../components/Modal.svelte';
   import { Moon } from 'svelte-loading-spinners';
   import { getNotificationsContext } from 'svelte-notifications';
   const { addNotification } = getNotificationsContext();
   import { goto } from "$app/navigation";
   import { browser } from '$app/env'
   import Breadcrumbs from '$components/Breadcrumbs.svelte'
   export let username
   export let id
   if(browser && !id){
      goto('/')
   }
   const optionIdentifier = 'id'
   const labelIdentifier = 'name'
   
   
   let name, repo, repo_path, type;
   let readme_path = 'README.md';
   let desc = '';
   async function publish(){
      if(!repo){
         addNotification({ text: 'Select a GitHub repo!', position: 'bottom-center' })
      }else{
         document.getElementById('page').style.display = 'none'
         document.getElementById('loader').style.display = 'flex'
         // openModal(PublishModal,{title:'Publish your script', message:'Are you ready to publish ' + name + ' to Shareable?'})
         let request = await fetch('./api/publish',{
            method:'POST',
            body:JSON.stringify({
               title: name,
               author:{
                  author_id:id,
                  author_username: username
               },
               type:type.value,
               desc: desc,
               repo:{
                  repo_id:repo.id,
                  repo_name: repo.name,
                  file_path:repo_path,
                  readme_path: readme_path
               }
            })
         })
         let res = await request.json()
         if(res.status == 'success'){
            goto('/script/' + res.id)
         }else if(res.status = 'invalid url'){
            document.getElementById('page').style.display = 'block'
            document.getElementById('loader').style.display = 'none'
            openModal(Modal, {title:'Whoops!', message:res.message})
         }else{
            document.getElementById('page').style.display = 'block'
            document.getElementById('loader').style.display = 'none'
            openModal(Modal, {title:'Whoops!', message:'Something went wrong! Please try again or reach support.'})
            
         }
      }
   }
   
   function handleSelect(event){
      repo = event.detail
   }
   function handleDeselect(){
      repo = null
   }
   function handleSelect2(event){
      type = event.detail
   }
   let path = [{name:'Home', url:'/', last:false}, {name:'Publish' ,url:'', last:true}]
</script>

<svelte:head>
   <title>Shareable | Publish</title>
</svelte:head>

{#if id}
   <div id="loader" class="loader"><Moon size="50" color="#FF2D55" unit="px" duration="1s"></Moon></div>
   <div id="page">
      <Breadcrumbs path={path} />
      <h1>Publish from GitHub</h1>
   <form on:submit|preventDefault={publish}>
      <div class="description-editor">
         <div>
            <h3>Informations</h3>
            <input type="text" class="form" placeholder="Script name" required="required" bind:value={name}>
            <p class="label">Choose a name for your script.</p>

            <div class="themed"><Select placeholder="Select type" on:select={handleSelect2} items={['Script', 'Home Screen Widget', 'Lock Screen Widget']}></Select></div>
            <p class="label">Choose the type of your project.</p>
         </div>
         <div>
            <h3>Import from GitHub</h3>
            <div class="themed"><Select {items} placeholder="Select repo" on:select={handleSelect} on:clear={handleDeselect} {optionIdentifier} {labelIdentifier}/></div>
            <p class="label">Choose the GitHub repo where the file you want to publish is (only public repos are supported as of now).</p>
            {#if repo}
               <input type="text" class="form" placeholder="path/to/file.js" required="required" bind:value={repo_path}>
               <p class="label">Type the path to the JavaScript file that contains your script's code. Example: "code/main.js"</p>
            {/if}
         </div>
      </div>
      
      <h3>Description</h3>
         <input type="text" class="form desc" placeholder="A brief description of your script" required="required" maxlength="100" bind:value={desc}>
         <p class="label">Description of your script</p>

         <input type="text" class="form"  bind:value={readme_path}>
         <p class="label">Type the path to the README file that will be used as your script's description"</p>
      <!-- <div class="description-editor">
         <div>
            <h3>Description</h3>
            <textarea class="form textarea" cols="30" rows="30" bind:value={desc}></textarea>
            <p class="label">Description of your script. Supports markdown.</p>
         </div>
         <div>
            <h3>Preview</h3>
            <textarea class="form textarea" readonly="true" cols="30" rows="30">{desc}</textarea>
            <p class="label"></p>
         </div>
      </div> -->

      <h3>Publish </h3>
         <button id="submitButton" type="submit" class="toolButton redBrandButton">Publish</button>
         <br><br><br>
   </form>
   </div>
{:else}
   <div></div>
{/if}


<style>
   .loader{
      display: none;
   }
   .desc{
      width:50%
   }
</style>