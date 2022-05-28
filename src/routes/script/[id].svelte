<script context="module">
   import supabase from '$lib/db';
   export async function load({params}){
      const id = params.id
      const { data, error } = await supabase.from('scripts').select('*').eq('id', id)
      let script = data[0]
      let file;
      if(script){
         let fileReq = await fetch(script.download_url)
         file = await fileReq.text()
      }

      return {props: {id, script, file}}
   }
</script>

<script>
   import feather from 'feather-icons';
   import { Moon } from 'svelte-loading-spinners';
   export let id;
   export let script;
   export let file;
   import { user } from "$lib/stores";
   import Breadcrumbs from '$components/Breadcrumbs.svelte'
   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
   let link = "data:text/javascript;charset=utf-8," + encodeURIComponent(file);
   import { startLoad } from '$lib/functions/utils';

   async function registerDownload(){
      const { data, error } = await supabase.rpc('increment', { row_id:id })
      document.getElementById('invisible-download').click()
      script.downloads = script.downloads + 1
   }
   let title;
   if(!script){
      title = 'Nothing found here!'
   }else{
      title = 'Shareable | ' + script.name
   }
   let editLink = '/edit?id=' + id
   let scriptLink = '/script/' + id
   let path = [{name:'Home', url:'/', last:false}, {name:script.name, url: scriptLink, last:true}]
</script>

<svelte:head>
   <title>{title}</title>
</svelte:head>

<div id="loader" class="loader"><Moon size="50" color="#FF2D55" unit="px" duration="1s"></Moon></div>
{#if script}
   <div class="script_page">
      <Breadcrumbs path={path} />
      <h1>{script.name}</h1>
      <h2 class="author">Created by <span id="author_name">{script.author_name}</span></h2>
      <br>
      <a href='' on:click={registerDownload} class="icon download scriptToolButton">{@html feather.icons['arrow-down'].toSvg()} Download</a>
      <a href={link} download={script.repo.filename.split('.')[0]} id="invisible-download" style="display=none;"> </a>

      {#if $user}
         {#if $user.id == script.author_id}
            <a href={editLink} on:click={startLoad}  class="icon edit scriptToolButton">{@html feather.icons['edit'].toSvg()} Edit</a>
         {/if}
      <br>
         <div id="buttonsBar">
            <a href='' class="icon review scriptToolButton">{@html feather.icons['message-square'].toSvg()} Review</a>
            <a href='' class="icon star scriptToolButton" >{@html feather.icons['star'].toSvg()} Star</a>
            <a href='' class="icon report scriptToolButton">{@html feather.icons['alert-triangle'].toSvg()} Report</a>
         </div>
      {/if}

      <div class="info">
         
         <div class="info_child">
            <h2>Informations</h2>
            <p class="info-p"><span class="info-title">Author:</span> {script.author_name}</p>
            <p class="info-p"><span class="info-title">Downloads:</span> {script.downloads}</p>
            <p class="info-p"><span class="info-title">Type:</span> {script.type}</p>
            <p class="info-p"><span class="info-title">Published on:</span> {new Date(script.created_at).getDate()} {months[new Date(script.created_at).getMonth()]} {new Date(script.created_at).getFullYear()}</p>
         </div>
                 
         <div class="info_child">
            <h2>Description</h2>
            {#if script.desc}
               <p>{script.desc}</p>
            {:else}
               <p>No description provided!</p>
            {/if}
         </div>

      </div>

      <div id="last-info-child" class="info_child">
         <h2>Reviews</h2>
         <p style="text-align:center; opacity:0.6; padding-top:60px">Coming soon!</p>
      </div>      
   </div>
{:else}
   <p class="not_found">We found nothing here!</p>
{/if}
   


<style>
   #last-info-child{
      padding-top: 40px
   }
   .info-p{
      margin-bottom:-15px;
   }
   #buttonsBar{
      margin-top: 25px;
      margin-bottom:40px
   }
   .info{
      display: grid;
      grid-template-columns: 25% 75%;
      padding-left: 5px;
      padding-right: 15px;
      margin-top:50px
   }
   .info_child{
      text-align: left;
   }
   .info-title{
      color:#aaa
   }
   .script_page{
      text-align: center;
   }
   .author{
      font-weight: 400;
      margin-top: -20px;
      font-size: 21px;
   }
   #author_name{
      color:#a1c4fd;
   }
   .loader{
      display: none;
   }
</style>