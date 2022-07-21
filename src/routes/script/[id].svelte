<script context="module">
   import supabase from '$lib/db';
   export async function load({params}){
      const id = params.id
      const { data, error } = await supabase.from('scripts').select('*').eq('id', id)
      let script = data[0]
      let file, readme;
      if(script){
         let fileReq = await fetch(script.download_url)
         file = await fileReq.text()
      }
      if(data.length > 0){
         if(script.repo.readme_path){
            let readmeReq = await fetch(script.repo.readme_download_url)
            readme = await readmeReq.text()
         }
      }
      return {props: {id, script, file, readme}}
   }
</script>

<script>
   import feather from 'feather-icons';
   import { Moon } from 'svelte-loading-spinners';
   export let id;
   export let script;
   export let file;
   export let readme;
   const source = `${readme}`
   import { user } from "$lib/stores";
   import Breadcrumbs from '$components/Breadcrumbs.svelte'
   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
   let link = "data:text/javascript;charset=utf-8," + encodeURIComponent(file);
   import { startLoad } from '$lib/functions/utils';
   import SvelteMarkdown from 'svelte-markdown'
   import { onMount } from 'svelte';
   async function registerDownload(){
      const { data, error } = await supabase.rpc('increment', { row_id:id })
      document.getElementById('invisible-download').click()
      script.downloads = script.downloads + 1
   }
   let title;
   let path = []
   if(!script){
      title = 'Nothing found here!'
   }else{
      title = 'Shareable | ' + script.name
   }
   let editLink = '/edit?id=' + id
   let scriptLink = '/script/' + id
   if(script){
      path = [{name:'Home', url:'/', last:false}, {name:script.name, url: scriptLink, last:true}]
   }

   // Fixing images
   onMount(()=>{
      let branch = script.download_url.replace(`https://raw.githubusercontent.com/${script.author_name}/${script.repo.repo_name}`, '').replace(`/${script.repo.file_path.replace(' ', '%20')}`, '').replace('/', '')
      for (let index = 0; index < document.querySelectorAll('img').length; index++) {
         document.querySelectorAll('img')[index].src = document.querySelectorAll('img')[index].src.replace('http://localhost:3000/script/', `https://raw.githubusercontent.com/${script.author_name}/${script.repo.repo_name}/${branch}/`)
         document.querySelectorAll('img')[index].src = document.querySelectorAll('img')[index].src.replace('http://localhost:3000/', `https://raw.githubusercontent.com/${script.author_name}/${script.repo.repo_name}/${branch}/`)
         document.querySelectorAll('img')[index].src = document.querySelectorAll('img')[index].src.replace('https://shareable.vercel.app/script/', `https://raw.githubusercontent.com/${script.author_name}/${script.repo.repo_name}/${branch}/`)
         document.querySelectorAll('img')[index].src = document.querySelectorAll('img')[index].src.replace('https://shareable.vercel.app/', `https://raw.githubusercontent.com/${script.author_name}/${script.repo.repo_name}/${branch}/`)
         if(document.querySelectorAll('img')[index].src.indexOf('blob') != -1){
            document.querySelectorAll('img')[index].src = document.querySelectorAll('img')[index].src + '?raw=true'
         }
         //console.clear()
         document.querySelectorAll('img')[index].style.maxWidth = '100%';
      }
      // highlight.js
      document.querySelectorAll('pre code').forEach((el)=>{
         hljs.highlightElement(el);
      })
   })
   let url = `https://shareable.vercel.app/script/${script.id}`
   var options = {
      'mangle':false
   }
</script>

<svelte:head>
   <title>{title}</title>
   <meta property="og:title" content={title} />
  	<meta property="og:description" content={script.desc}/>
  	<meta property="og:url" content={url} />
</svelte:head>

<div id="loader" class="loader"><Moon size="50" color="#FF2D55" unit="px" duration="1s"></Moon></div>
{#if script}
   <div class="script_page">
      <Breadcrumbs path={path} />
      <h1>{script.name}</h1>
      <h2 class="author">Created by <a href={'/user/' + script.author_id} id="author_name">{script.author_name}</a></h2>
      <br>
      <a href='' on:click={registerDownload} class="icon download scriptToolButton">{@html feather.icons['arrow-down'].toSvg()} Download</a>
      <a href={link} download={script.repo.filename.split('.')[0]} id="invisible-download" style="display=none;"> </a>

      {#if $user}
         {#if $user.id == script.author_id}
            <a href={editLink} on:click={startLoad}  class="icon edit scriptToolButton">{@html feather.icons['edit'].toSvg()} Edit</a>
         {/if}
      <br>
         <!-- <div id="buttonsBar">
            <a href='' class="icon review scriptToolButton">{@html feather.icons['message-square'].toSvg()} Review</a>
            <a href='' class="icon star scriptToolButton" >{@html feather.icons['star'].toSvg()} Star</a>
            <a href='' class="icon report scriptToolButton">{@html feather.icons['alert-triangle'].toSvg()} Report</a>
         </div> -->
      {/if}

      <div class="info">
         
         <div class="info_child">
            <h2>Informations</h2>
            <p class="info-p"><span class="info-title">Author:</span> <a id="info-a" href={'/user/' + script.author_id}>{script.author_name}</a></p>
            <p class="info-p"><span class="info-title">Downloads:</span> {script.downloads}</p>
            <p class="info-p"><span class="info-title">Type:</span> {script.type}</p>
            <p class="info-p"><span class="info-title">Published on:</span> {new Date(script.created_at).getDate()} {months[new Date(script.created_at).getMonth()]} {new Date(script.created_at).getFullYear()}</p>
         </div>
                 
         <div class="info_child">
            <h2>Description</h2>
            {#if script.repo.readme_path}
               <div class="desc">
                  <SvelteMarkdown source={source} options={options} />
               </div>
            {:else}
               <p>No description provided!</p>
            {/if}
         </div>

      </div>

      <!-- <div id="last-info-child" class="info_child">
         <h2>Reviews</h2>
         <p style="text-align:center; opacity:0.6; padding-top:60px">Coming soon!</p>
      </div>       -->
   </div>
{:else}
   <p class="not_found">We found nothing here!</p>
{/if}
   


<style>
   #info-a{
      color:white;
      text-decoration: underline;
   }
   #info-a:hover{
      opacity: 0.7;
   }
   .loader{
      display: none;
   }
</style>