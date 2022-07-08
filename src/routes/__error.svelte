<script context="module">
   export function load(error){
      let status = error.status
      return {props:{status}}
   }
</script>

<script>
   import { ScaleOut } from 'svelte-loading-spinners';
   export let status;
</script>

{#if status == 500}
   <div class="loader"><ScaleOut size="50" color="#FF2D55" unit="px" duration="1s"></ScaleOut></div>
   <p class="not_found">Something went wrong!</p>
{:else if status == 404}
   <div class="loader"><ScaleOut size="50" color="#FF2D55" unit="px" duration="1s"></ScaleOut></div>
   <p class="not_found">Nothing found here!</p>
{/if}

<style>
   .not_found{
      opacity: 0.7;
      text-align: center;
      padding-top: 0px !important;
      font-size: 25px;
   }
</style>