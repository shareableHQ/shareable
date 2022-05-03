<script>
   import { user } from "$lib/stores";
</script>

<svelte:head>
   <title>Shareable | Home</title>
</svelte:head>

{#if $user}
   <h1><span class="brand">Welcome back</span> {$user.user_metadata.user_name}</h1>
{:else}
   <h1 class="brand">Home</h1>
{/if}