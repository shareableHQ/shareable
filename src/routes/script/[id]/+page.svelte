<script>
   export let data
   let { id, script, file, readme, stars, starsObj, reports, generated_download_link } = data
   let editLink = '/edit?id=' + id
   let scriptLink = '/script/' + id
   let title, path = [];
   if(!script){
      title = 'Nothing found here!'
   }else{
      title = 'Shareable | ' + script.name
   }
   if(script){
      path = [{name:'Home', url:'/', last:false}, {name:script.name, url: scriptLink, last:true}]
   }
   let url = `https://shareable.vercel.app/script/${id}`
   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

   import supabase from '$lib/db';
   import Breadcrumbs from '../../../lib/components/Breadcrumbs.svelte';
   import { Download, Edit, MessageSquare, Star, AlertTriangle, BellPlus, BellMinus } from 'lucide-svelte';
   import { user } from '$lib/stores';
   import { star, unstar, report, follow, unfollow } from '$lib/functions/scriptUtilities';
   import { getNotificationsContext } from 'svelte-notifications';
   const { addNotification } = getNotificationsContext();
   import { onMount } from 'svelte';
   let isFollowing = true
   let isStarred, isReported = false;
   if($user){
      checkFollow()
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
      if (list.length == 0){ isFollowing = false } else { isFollowing = true }
   }
   onMount(()=>{
        // highlight.js
        document.querySelectorAll('pre code').forEach((el)=>{
            hljs.highlightElement(el);
        })
   })

   async function registerDownload(){
      const { data, error } = await supabase.rpc('increment', { row_id:id })
      document.getElementById('invisible-download').click()
      script.downloads = script.downloads + 1
   }
   // Invoke functions
   async function invokeStar(){
      let error = await star(script.id, $user.id)
      if(error){
         addNotification({ text: 'Something went wrong!', position: 'top-right', removeAfter:'3000', type: 'danger' })
      }else{
         isStarred = true
         stars += 1
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
         addNotification({text: 'Following ' + script.name + '!', position: 'top-center', removeAfter: '3000', type: 'success'})
      }
   }
   async function invokeUnfollow(){
      let error = await unfollow(script.id, $user.id)
      if(error){
         addNotification({ text: 'Something went wrong!', position: 'top-right', removeAfter:'3000', type: 'danger' })
      }else{
         isFollowing = false
         addNotification({text: 'Unfollowed!', position: 'top-center', removeAfter: '3000', type: 'warning'})
      }
   }
</script>


<svelte:head>
   <title>{title}</title>
   <meta property="og:title" content={title} />
   {#if script} 
      <meta property="og:description" content={script.desc}/>
   {:else}
      <meta name="description" content="Not found">
   {/if}
  	<meta property="og:url" content={url} />
</svelte:head>

{#if script}
<div class="script_page">
    <Breadcrumbs path={path} />
    <h1>{script.name}</h1>
    <h2 class="author">Created by <a href={'/user/' + script.author_id} id="author_name">{script.author_name}</a></h2>
    <p><span class="tag"> <span class="icon startag"><Star /> </span>{stars}</span></p>
    <br>
    <a href='' on:click={registerDownload} class="icon download scriptToolButton"><Download /> Download</a>
    <a href={generated_download_link} download={script.repo.filename.split('.')[0]} id="invisible-download" style="display=none;"> </a>
    {#if $user}
        {#if $user.id == script.author_id}
            <a href={editLink}  class="icon edit scriptToolButton"><Edit /> Edit</a>
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
            {#if script.repo.readme_path && readme != ''}
               <div class="desc">
                  {@html readme}
               </div>
            {:else}
               <p>No description provided!</p>
            {/if}
         </div>
    </div>
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
    /* .loader{
       display: none;
    } */
 </style>