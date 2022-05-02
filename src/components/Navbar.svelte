<script>
   import feather from 'feather-icons';
   import { goto } from "$app/navigation";
   import { user, sidebar } from "$lib/stores";
   import supabase from "$lib/db";
   const logOut = async () => {
      let { error } = await supabase.auth.signOut();
      $user = false;
      goto("/login");
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

</script>

<div class="navbar-container">
   <div class="fake"></div>
   <nav>
      <div class="left-block">
         <a on:click={openMenu} class="button-icon nav-title nav-link icon" href="/#">{@html feather.icons.menu.toSvg()}</a>
      </div>
      <div class="rigth-block">
         <a class="button-icon nav-link icon" href="/profile">{@html feather.icons.user.toSvg()}</a>
         {#if $user.email}
            <a on:click={logOut} href="/#" class="redBrandButton nav-button">Logout</a>
         {:else}
            <a on:click={logOut} href="/login" class="redBrandButton nav-button">Login</a>
         {/if}
         <!-- <a href="https://github.com/shareableHQ" target="_blank" class="button-icon nav-link icon">{@html feather.icons.github.toSvg()}</a> -->
      </div>
   </nav>
</div>