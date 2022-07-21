<script>
   import feather from 'feather-icons';
   import { sidebar } from '$lib/stores.js';
   import { user } from "$lib/stores";
   import { startLoad, endLoad } from '$lib/functions/utils';
   import { tagStore, loading } from '$lib/stores';
   let isOpen = false
   $:{
      isOpen = $sidebar
   }
   function closeSidebar(param){
      sidebar.set(false)
      document.getElementsByTagName('body')[0].style.overflow = 'unset'
      startLoad()
      if(param == 'tag'){
         tagStore.set(!$tagStore)
      }else if(param == 'load'){
         loading.set(!$loading)
      }
   }
</script>

<div id="sidebar" class="sidebar" class:isOpen>
   <div class="sidebar-content">
      <p class="sidebarHeader">
         <span>Sections</span>
       </p>
      <div class="headerLinks">
         <a on:click={(()=>{closeSidebar('load')})} class="icon" href="/">{@html feather.icons.home.toSvg()} Home</a>
         <a on:click={(()=>{closeSidebar('load')})} class="icon" href="/search">{@html feather.icons.search.toSvg()} Search</a>
         {#if $user.email}
            <a on:click={(()=>{closeSidebar('load')})} class="icon" href="/import">{@html feather.icons['plus-circle'].toSvg()} Publish from GitHub</a>
            <a on:click={(()=>{closeSidebar('load')})} class="icon" href={'/user/' + $user.id}>{@html feather.icons['user'].toSvg()} Profile</a>
         {/if}
       </div>

       <p class="sidebarHeader">
         <span>Browse</span>
       </p>
       <div class="headerLinks">
         <a on:click={(()=>{closeSidebar('tag')})} class="icon" href="/browse?tag=Script">{@html feather.icons.code.toSvg()} Scripts</a>
         <a on:click={(()=>{closeSidebar('tag')})} class="icon" href="/browse?tag=Home Screen Widget">{@html feather.icons.grid.toSvg()} Home screen widgets</a>
         <a on:click={(()=>{closeSidebar('tag')})} class="icon" href="/browse?tag=Lock Screen Widget">{@html feather.icons.smartphone.toSvg()} Lock screen widgets</a>
         <a on:click={(()=>{closeSidebar('tag')})} class="icon" href="/browse?tag=All">{@html feather.icons.folder.toSvg()} All widgets</a>
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