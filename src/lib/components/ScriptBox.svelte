<script>
   import { Download, Smartphone, LayoutGrid, Code } from 'lucide-svelte';
   //import { startLoad } from '$lib/functions/utils';
   export let script
</script>

<div class="script-cell">
   <div class="script-left">
      <p class="script-title">{script.name}</p>
      <p class="script-author-date">{script.desc}</p>
      <p class="script-details"><span class="icon tag scriptbox-icon"><Download /> {script.downloads}</span> <span class="icon tag scriptbox-icon">{#if script.type == 'Lock Screen Widget'}<Smartphone />{:else if script.type == 'Home Screen Widget'}<LayoutGrid />{:else}<Code />{/if} {script.type}</span></p>
   </div>
   <div class="script-right">
      <a class="script-link get_button" href={"/script/" + script.id}>GET</a>
   </div>
</div>