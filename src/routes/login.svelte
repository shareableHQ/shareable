<script>
   import { goto } from "$app/navigation";
   import supabase from "$lib/db";
   import { user } from "$lib/stores";
   import { openModal } from 'svelte-modals'
   import Modal from '../components/Modal.svelte';
   import { setUsername } from '$lib/functions/userActions.js'
 
   let email, password, username;
   let isNewRegistration = false;
 
   const signUp = async () => {
      let { user: userDetails, error } = await supabase.auth.signUp({
         email: email,
         password: password,
      },{
         data:{
            username:username
         }
      });
      if(error){
         openModal(Modal, { title: "Something went wrong!", message: error.message })
         email = null
         password = null
      }else{
         await setUsername(userDetails.user_metadata.username, userDetails.id)
         console.log(userDetails.user_metadata)
         $user = userDetails;
         if(!error){
            goto('/')
         }
      }
   };
 
   const logIn = async () => {
      let { user: userDetails, error } = await supabase.auth.signIn({
         email: email,
         password: password,
      });
      if(error){
         openModal(Modal, { title: "Something went wrong!", message: error.message })
         email = null
         password = null
      }else{
         $user = userDetails;
         if(!error){
            goto('/')
         }
      }
   };
</script>
 
<svelte:head>
   <title>Shareable | Authentication</title>
</svelte:head>

{#if isNewRegistration}
   <h1 class="brand">Sign up</h1>
   <form on:submit|preventDefault={signUp}>
      <input type="text" class="form" placeholder="Username" required="required" bind:value={username}><br>
      <input type="email" class="form" placeholder="Email address" required="required" bind:value={email} /><br>
      <input type="password" class="form" placeholder="Password" required="required" bind:value={password}><br>
      <button type="submit" class="toolButton redBrandButton">Sign up</button>
      <p><a href="/login#" class="switch" on:click={() => (isNewRegistration = false)}>Already have an account? <span class="brand">Login!</span></a></p>
   </form>
{:else}
   <h1 class="brand">Login</h1>
   <form on:submit|preventDefault={logIn}>
      <input type="email" class="form" placeholder="Email address" required="required" bind:value={email} />
      <input type="password" class="form" placeholder="Password" required="required" bind:value={password}>
      <button type="submit" class="toolButton redBrandButton">Login</button>
      <p><a href="/login#" class="switch" on:click={() => isNewRegistration = true}>New to Shareable? <span class="brand">Create an account!</span></a></p>
   </form>
{/if}

<style>
   a{
      text-decoration: none;
      color: unset;
   }
</style>