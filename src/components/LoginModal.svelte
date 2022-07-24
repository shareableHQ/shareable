<script>
   import { closeModal } from 'svelte-modals'
   import { Github } from 'lucide-svelte'
   import supabase from "$lib/db";
   export let isOpen
   
   const logIn = async () => {
      let { user: userDetails, error } = await supabase.auth.signIn({
         provider:'github'
      },{
         scopes: 'public_repo'
      });
   };
</script>
 
{#if isOpen}
<div role="dialog" class="modal">
   <div class="contents">
      <h2>Login with GitHub</h2>
      <button on:click={logIn} class="icon toolButton redBrandButton"><Github /> Sign in</button>
      <div class="actions">
      <button class="toolButton" on:click={closeModal}>Back</button>
      </div>
   </div>
</div>
{/if}

<style>
   .redBrandButton{
      font-size: 16px;
   }
   .icon > svg{
      width: 14px;
      height: 14px;
   }
   .toolButton{
      padding:7px 20px;
      display: flex;
      align-content: baseline;
      justify-content: center;
      gap:5px;
   }
   .modal {
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      /* allow click-through to backdrop */
      pointer-events: none;
   }

   .contents {
      min-width: 240px;
      border-radius: 6px;
      padding: 16px;
      background: #333333;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      pointer-events: auto;
      color:white
   }

   h2 {
      text-align: center;
      font-size: 24px;
   }

   p {
      text-align: center;
      margin-top: 16px;
   }

   .actions {
      margin-top: 32px;
      display: flex;
      justify-content: flex-end;
   }
</style>