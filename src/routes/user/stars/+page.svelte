<script>
    import { user } from '$lib/stores';
    import { browser } from '$app/environment';
    import ScriptBox from '../../../lib/components/ScriptBox.svelte';
    export let data;
    let { dbResponse, scripts } = data
    let starred = [];
    let starredIDs = []
    dbResponse.forEach(star => {
        if(star.stargazer == $user.id){ starredIDs.push(star.script_starred) }
    });
    starredIDs = starredIDs.reverse()
    starredIDs.forEach(star=>{
        var script = scripts.filter(item=>{
            return item.id == star
        })
        starred.push(script[0])
    }) 
</script>

<h1>Starred</h1>
<div class="scripts-container">
   {#each starred as script}
      <ScriptBox script={script} />
   {/each}
</div>