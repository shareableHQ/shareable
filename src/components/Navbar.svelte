<script>
   import feather from 'feather-icons';
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
         <a on:click={openMenu} class="button-icon nav-title nav-link icon" href="#">{@html feather.icons.menu.toSvg()}</a>
         <a class="nav-title nav-link" href="/">Shareable <span class="status">Alpha</span></a>
      </div>
      <div class="rigth-block">
         {#if $user.email}
            <div class="rightGroup" on:click={clickOnAvatar}>
               <img class="avatar" src={$user.user_metadata.avatar_url} alt="">
               <span id="chevron" class="icon icon_navbar">{@html feather.icons['chevron-down'].toSvg()}</span>
            </div>
         {:else}
            <button on:click={logInPrompt} class="redBrandButton nav-button">Login</button>
         {/if}
      </div>
   </nav>
</div>

{#if $user && isVisible}
<div id="floating-modal" class:isVisible in:fly="{{x:200}}" out:fly="{{x:200, duration:800}}">
   <p id="floating_username">Hi, {$user.user_metadata.user_name}</p>
   <p id="floating_email">{$user.email}</p>
   <button on:click={logOut} class=" nav-button" id="floating_button">Logout</button>
</div>
{/if}

<style>
   .avatar{
      height: 21px;
      border-radius: 50%;
   }
   #floating_username{
      opacity: 0.7;
      margin-bottom: -6px;
   }
   #floating_email{
      opacity: 0.5;
      margin-bottom: 10px;
      font-size: 10.5px;
   }
   #floating_button{
      width: 100px;
      background-color: #262626;
   }
   #floating_button:hover{
      opacity: 0.7;
   }
   #floating-modal{
      position: absolute;
      right: 10px;
      top:60px;
      width: 130px;
      text-align: left;
      padding-left: 10px;
      font-size: 14px;
      border-radius: 4px;
      background-color: #333333;
      transition: right 0.3s ease-in-out;
      padding-bottom:10px;
      padding-top:10px;
   }
   .isVisible{
      display: block !important;
   }
</style>