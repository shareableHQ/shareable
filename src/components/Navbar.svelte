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
            <button on:click={logOut} class="redBrandButton nav-button">Logout</button>
         {:else}
            <button on:click={logInPrompt} class="redBrandButton nav-button">Login</button>
         {/if}
      </div>
   </nav>
</div>