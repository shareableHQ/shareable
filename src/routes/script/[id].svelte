<script>
   // Import
   import { Download, Edit, MessageSquare, Star, AlertTriangle, BellPlus, BellMinus } from 'lucide-svelte';
   import { Moon } from 'svelte-loading-spinners';
   import { user } from "$lib/stores";
   import Breadcrumbs from '$components/Breadcrumbs.svelte';
   import { startLoad } from '$lib/functions/utils';
   import SvelteMarkdown from 'svelte-markdown';
   import { onMount } from 'svelte';
   import supabase from '$lib/db';
   import { star, unstar, report, follow, unfollow } from '$lib/functions/scriptActions';
   import { getNotificationsContext } from 'svelte-notifications';
   const { addNotification } = getNotificationsContext();
   // Props
   export let id;
   export let script;
   export let file;
   export let readme;
   export let stars;
   export let starsObj;
   export let reports;
   // Looking if script was starred by user or if a report was made by the user
   let isStarred = false;
   let isReported = false;
   let isFollowing = true;
   if($user){
      isFollowing = checkFollow()
      starsObj.forEach(element => {
         if(element.stargazer == $user.id) isStarred = true 
      });
      reports.forEach(element =>{
         if(element.author_id == $user.id) {
            isReported = true
         }
      })
   }
   async function checkFollow(){
      const { data, error } = await supabase.from('profiles').select('following').eq('id', $user.id)
      var list = data[0].following
      list = list.filter((item)=>{
         return item.script == id
      })
      if (list.length > 0){ return true } else { return false }
   }
   // Constants
   const source = `${readme}`
   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
   // Link and title
   let link = "data:text/javascript;charset=utf-8," + encodeURIComponent(file);
   let title, path = [];
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

   async function registerDownload(){
      const { data, error } = await supabase.rpc('increment', { row_id:id })
      document.getElementById('invisible-download').click()
      script.downloads = script.downloads + 1
   }
   onMount(()=>{
      // Fixing images
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
   // svelte-markdown options
   var options = {
      'mangle':false
   }

   // Invoke functions
   async function invokeStar(){
      let error = await star(script.id, $user.id)
      if(error){
         addNotification({ text: 'Something went wrong!', position: 'top-right', removeAfter:'3000', type: 'danger' })
      }else{
         isStarred = true
         stars =+ 1
      }
   }
   async function invokeUnstar(){
      let error = await unstar(script.id, $user.id)
      if(error){
         addNotification({ text: 'Something went wrong!', position: 'top-right', removeAfter:'3000', type: 'danger' })
      }else{
         isStarred = false
         stars -= 1
      }
   }
   async function invokeReport(){
      let message = window.prompt('Why are you reporting this script?')
      if(message == null){
         
      }else if(message.trim().length == 0){
         addNotification({text:'Please tell us why are you reporting the script by inserting a message in the prompt!', position:'top-center', removeAfter:'3000', type:'warning'})
      }else{
         let error = await report(script.id, $user.id, $user.user_metadata.user_name, message)
         if(error){
            addNotification({ text: 'Something went wrong!', position: 'top-right', removeAfter:'3000', type: 'danger' })
         }else{
            addNotification({text: 'Report sent! Thank you!', position: 'top-center', removeAfter: '3000', type: 'success'})
            isReported = true
         }
      }
   }

   async function invokeFollow(){
      let error = await follow(script.id, $user.id)
      if(error){
         addNotification({ text: 'Something went wrong!', position: 'top-right', removeAfter:'3000', type: 'danger' })
      }else{
         isFollowing = true
      }
   }
   async function invokeUnfollow(){
      let error = await unfollow(script.id, $user.id)
      if(error){
         addNotification({ text: 'Something went wrong!', position: 'top-right', removeAfter:'3000', type: 'danger' })
      }else{
         isFollowing = false
      }
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
      <p><span class="tag"> <span class="icon startag"><Star /> </span>{stars}</span></p>
      <br>
      <a href='' on:click={registerDownload} class="icon download scriptToolButton"><Download /> Download</a>
      <a href={link} download={script.repo.filename.split('.')[0]} id="invisible-download" style="display=none;"> </a>

      {#if $user}
         {#if $user.id == script.author_id}
            <a href={editLink} on:click={startLoad}  class="icon edit scriptToolButton"><Edit /> Edit</a>
         {/if}
         <br>
         {#if $user.id != script.author_id}
            <div id="buttonsBar">
               {#if !isFollowing}
                  <button on:click={invokeFollow} class="icon review scriptToolButton"><BellPlus /> Follow</button>
               {:else}
                  <button on:click={invokeUnfollow} class="icon review scriptToolButton"><BellMinus /> Unfollow</button>
               {/if}
               {#if !isStarred}
                  <button on:click={invokeStar} class="icon star scriptToolButton" ><Star /> Star</button>
               {:else}
                  <button on:click={invokeUnstar} class="icon star scriptToolButton" ><Star fill="#333"/> Unstar</button>
               {/if}
               {#if !isReported}
                  <button id="reportButton" on:click={invokeReport} class="icon report scriptToolButton"><AlertTriangle /> Report</button>
               {:else}
                  <button disabled id="reportButton" on:click={invokeReport} class="icon report scriptToolButton isReported"><AlertTriangle /> Report</button>
               {/if}
            </div>
         {/if}
      {/if}

      <div class="info">
         
         <div class="info_child">
            <h2>Informations</h2>
            <p class="info-p"><span class="info-title">Author:</span> <a id="info-a" href={'/user/' + script.author_id}>{script.author_name}</a></p>
            <p class="info-p"><span class="info-title">Downloads:</span> {script.downloads}</p>
            <p class="info-p"><span class="info-title">Stars:</span> {stars}</p>
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
   .isReported{
      opacity: 0.6;
      cursor: not-allowed;
   }
   .tag{
      background-color: #FFE6771a;
   }
   .startag{
      color: #FFE677;
   }
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