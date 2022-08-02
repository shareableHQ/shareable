<script>
   import { Home, Search, User, PlusCircle, Code, LayoutGrid, Smartphone, Folder, Rss, Github, Users, Star } from 'lucide-svelte'
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
         <a on:click={(()=>{closeSidebar('load')})} class="icon" href="/"><Home /> Home</a>
         <a on:click={(()=>{closeSidebar('load')})} class="icon" href="/search"><Search /> Search</a>
         {#if $user.email}
            <a on:click={(()=>{closeSidebar('load')})} class="icon" href="/import"><PlusCircle /> Publish from GitHub</a>
         {/if}
       </div>

       {#if $user}
         <p class="sidebarHeader">
            <span>Profile</span>
         </p>
         <div class="headerLinks">
            <a on:click={(()=>{closeSidebar('load')})} class="icon" href={'/user/' + $user.id}><User /> Profile</a>
            <a on:click={(()=>{closeSidebar('load')})} class="icon" href="/user/stars" ><Star /> Starred</a>
         </div>
      {/if}

       <p class="sidebarHeader">
         <span>Browse</span>
       </p>
       <div class="headerLinks">
         <a on:click={(()=>{closeSidebar('tag')})} class="icon" href="/browse?tag=Script"><Code /> Scripts</a>
         <a on:click={(()=>{closeSidebar('tag')})} class="icon" href="/browse?tag=Home Screen Widget"><LayoutGrid /> Home screen widgets</a>
         <a on:click={(()=>{closeSidebar('tag')})} class="icon" href="/browse?tag=Lock Screen Widget"><Smartphone /> Lock screen widgets</a>
         <a on:click={(()=>{closeSidebar('tag')})} class="icon" href="/browse?tag=All"><Folder /> All widgets</a>
       </div>

       <p class="sidebarHeader">
         <span>About</span>
       </p>
       <div class="headerLinks">
         <a href="/feed" class="icon"><Rss /> RSS feed</a>
         <a class="icon" href="https://github.com/shareableHQ/shareable" target="_blank"><Github /> Source code</a>
         <a class="icon" on:click={closeSidebar} href="/team"><Users /> Shareable Team</a>
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