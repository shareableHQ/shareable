<script>
   import { Moon } from 'svelte-loading-spinners';
   import { Search } from 'lucide-svelte';
   import Footer from '$components/Footer.svelte';
   import ScriptBox from '$components/ScriptBox.svelte';

   export let data, most_downloaded


   let recent = data.slice(0, 6);
   
   let searchParam;
   async function search(){
      const url = '/search?q=' + searchParam 
      window.location.href = url;
   }
</script>

<svelte:head>
   <meta property="og:title" content="Shareable" />
  	<meta property="og:description" content="A place for sharing and browsing Scriptable scripts and widgets."/>
  	<meta property="og:url" content="https://shareable.vercel.app" />
   <title>Shareable | Home</title>
</svelte:head>

<div id="loader" class="loader"><Moon size="50" color="#FF2D55" unit="px" duration="1s"></Moon></div>
<div id="page">
   <h1 id="title">Welcome to Shareable!</h1>
   <form class="searchBar" on:submit|preventDefault={search}>
      <input bind:value={searchParam} class="seachForm" type="text" name="search" id="" placeholder="Search">
      <button type="submit" class="toolButton searchButton icon"><Search /></button>
   </form>
   <h2>Recent</h2>
   <div class="scripts-container">
      {#each recent as script}
         <ScriptBox script={script} />
      {/each}
	</div>
   <br><br><br>
   <h2>Most downloaded</h2>
   <div class="scripts-container">
      {#each most_downloaded as script}
         <ScriptBox script={script} />
      {/each}
	</div>
<Footer />
</div>


<style>
   #title{
      text-align: center;
   }
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