<script>
   import { Moon } from 'svelte-loading-spinners';
   import ScriptBox from '$components/ScriptBox.svelte';
   export let data;
   export let user_metadata
   let username
   if(data.length != 0){
      username = data[0].author_name
   }
   let title = `Shareable | ${username}`
</script>

<svelte:head>
   <title>{title}</title>
   <meta property="og:title" content={title} />
</svelte:head>


<div id="loader" class="loader"><Moon size="50" color="#FF2D55" unit="px" duration="1s"></Moon></div>
{#if data.length == 0}
   <div class="loader_error"></div>
   <p class="not_found">We found nothing about this user!</p>
   <p class="not_found_p">They probably haven't published anything yet or not even created an account!</p>
{:else}
<div class="user_title">
   <img class="user_avatar" src={user_metadata.avatar} alt="">
   <h1>{username}</h1>
</div>
<div class="info">
   <p class="tag">Publications: {data.length}</p>
   <p class="tag">Total downloads: {user_metadata.totalDownloads}</p>
</div>
<div class="scripts-container">
   {#each data as script}
      <ScriptBox script={script} />
   {/each}
</div>
{/if}


<style>
   .info{
      display: flex;
      justify-content: center;
      gap:10px;
      margin-bottom: 20px;
   }
   .scripts-container{
      padding-top: 30px;
      padding-left: 50px;
      padding-right: 40px;
   }
   @media(max-width:550px){
      .scripts-container{
         padding-top: 20px;
         padding-left: inherit;
         padding-right: inherit;
      }
   }
   .user_title{
      padding-top: 20px;
      display: flex;
      gap:10px;
      align-items: center;
      justify-content: center;
      margin-bottom: -50px;
   }
   .user_avatar{
      width:65px;
      height: 65px;
      border-radius: 50%;
   }
   .not_found{
      opacity: 0.7;
      text-align: center;
      padding-top: 0px !important;
      font-size: 25px;
   }
   .not_found_p{
      opacity: 0.5;
      text-align: center;
      padding-top: 0px !important;
   }
   .loader{
      display: none;
   }
</style>