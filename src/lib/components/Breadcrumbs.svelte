<script>
   export let path
</script>


<p id="breadcrumbs" class="breadcrumbs">{#each path as link}<a href={link.url}>{link.name}</a> {#if !link.last} / {/if}{/each}</p>