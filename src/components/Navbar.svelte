<script>
   import feather from 'feather-icons';
   import { goto } from "$app/navigation";
   import { user, sidebar } from "$lib/stores";
   import supabase from "$lib/db";
   import { openModal } from 'svelte-modals'
   import LoginModal from '../components/LoginModal.svelte';

   const logOut = async () => {
      let { error } = await supabase.auth.signOut();
      $user = false;
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

<div id="floating-modal" class:isVisible>
   <button on:click={logOut} class="redBrandButton nav-button">Logout</button>
</div>

<style>
   .rightGroup{
      /* background-color: #ffffff1a;
      padding:4px 10px;
      border-radius: 4px;
      color:#fff; */
   }
   .avatar{
      height: 21px;
      border-radius: 50%;
   }
   #floating-modal{
      position: absolute;
      right: 10px;
      top:60px;
      width: 150px;
      text-align: center;
      border-radius: 4px;
      background-color: #333333;
      transition: right 0.3s ease-in-out;
      padding-bottom:10px;
      padding-top:10px;
      display: none;
   }
   .isVisible{
      display: block !important;
   }
</style>