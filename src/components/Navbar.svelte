<script>
   import { Menu, ChevronDown } from 'lucide-svelte'
   import { user, sidebar } from "$lib/stores";
   import supabase from "$lib/db";
   import { openModal } from 'svelte-modals'
   import LoginModal from '../components/LoginModal.svelte';
   import { fly } from 'svelte/transition'
   import { getNotificationsContext } from 'svelte-notifications';
   const { addNotification } = getNotificationsContext();

   const logOut = async () => {
      let { error } = await supabase.auth.signOut();
      $user = false;
      addNotification({ text: 'See you later!', position: 'bottom-right', removeAfter:'2000' })
   };
   function openMenu(){
      if($sidebar){
         sidebar.set(false)
         document.getElementsByTagName('body')[0].style.overflow = 'unset'
      }else{
         sidebar.set(true)
         document.getElementsByTagName('body')[0].style.overflow = 'hidden'
      }
   }
   function logInPrompt(){
      openModal(LoginModal)
   }
   let isVisible = false
   let degrees = 0
   function clickOnAvatar(){
      isVisible = !isVisible
      if(degrees == 90){
         degrees = 0
      }else{
         degrees = 90
      }
      document.getElementById('chevron').children[0].style.transform = 'rotate(' + degrees + 'deg)'
      
   }
</script>

<div class="navbar-container">
   <div class="fake"></div>
   <nav>
      <div class="left-block">
         <a on:click={openMenu} class="button-icon nav-title nav-link icon" href="#"><Menu /></a>
         <a class="nav-title nav-link" href="/">Shareable <span class="status">Alpha</span></a>
      </div>
      <div class="rigth-block">
         {#if $user.email}
            <div class="rightGroup" on:click={clickOnAvatar}>
               <img class="avatar" src={$user.user_metadata.avatar_url} alt="">
               <span id="chevron" class="icon icon_navbar"><ChevronDown /></span>
            </div>
         {:else}
            <button on:click={logInPrompt} class="redBrandButton nav-button">Login</button>
         {/if}
      </div>
   </nav>
</div>

{#if $user && isVisible}
   <div id="floating-modal" class:isVisible in:fly="{{x:200}}" out:fly="{{x:200, duration:800}}">
      <p id="floating_username">Hi, <a class="profile_link" on:click={()=>{isVisible = false}} href={'/user/' + $user.id}>{$user.user_metadata.user_name}</a></p>
      <p id="floating_email">{$user.email}</p>
      <button on:click={logOut} class=" nav-button" id="floating_button">Logout</button>
   </div>
{/if}

<style>
   .avatar{
      height: 21px;
      border-radius: 50%;
   }
</style>