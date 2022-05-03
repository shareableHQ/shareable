<script>
   import { goto } from "$app/navigation";
   import { user } from "$lib/stores";
   if(!$user.email){
      goto('/login')
   }
</script>


<h1 class="brand">Settings</h1>