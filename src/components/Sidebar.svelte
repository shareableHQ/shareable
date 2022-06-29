<script>
   import feather from 'feather-icons';
   import { sidebar } from '$lib/stores.js';
   import { user } from "$lib/stores";
   import { startLoad, endLoad } from '$lib/functions/utils';
   let isOpen = false
   $:{
      console.log($sidebar)
      isOpen = $sidebar
   }
   function closeSidebar(){
      sidebar.set(false)
      document.getElementsByTagName('body')[0].style.overflow = 'unset'
      startLoad()
   }
</script>

<div id="sidebar" class="sidebar" class:isOpen>
   <div class="sidebar-content">
      <p class="sidebarHeader">
         <span>Sections</span>
       </p>
      <div class="headerLinks">
         <a on:click={closeSidebar} class="icon" href="/">{@html feather.icons.home.toSvg()} Home</a>
         <a on:click={closeSidebar} class="icon" href="/search">{@html feather.icons.search.toSvg()} Search</a>
         {#if $user.email}
            <a on:click={closeSidebar} class="icon" href="/import">{@html feather.icons['plus-circle'].toSvg()} Publish from GitHub</a>
         {/if}
       </div>

       <p class="sidebarHeader">
         <span>About</span>
       </p>
       <div class="headerLinks">
         <a class="icon" href="https://github.com/shareableHQ/shareable" target="_blank">{@html feather.icons.github.toSvg()} Source code</a>
         <a class="icon" on:click={closeSidebar} href="/team">{@html feather.icons.users.toSvg()} Shareable Team</a>
       </div>
   </div>
</div>
<div class="sidebar-fake" class:isOpen></div>


<style>
   .sidebar, .sidebar-fake{
      transition: left 0.3s ease-in-out
   }
   a{
	   text-decoration: none;
   }
   a:hover{
      opacity: 0.7;
      text-decoration: underline;
   }
</style>