<script>
    import { user } from '$lib/stores';
    import { browser } from '$app/environment';
    import ScriptBox from '../../../lib/components/ScriptBox.svelte';
    export let data;
    let { dbResponse, scripts } = data
    let followingIDs = [];
    let following = [];
    if(browser){
        let filteredData = dbResponse.filter((element)=>{
            return element.id == $user.id
        })
        followingIDs = filteredData[0].following
        followingIDs.forEach(element=>{
            var script = scripts.filter(item =>{
                return item.id == element.script
            })
            following.push(script[0])
        })
    }    
</script>


<h1>Following</h1>
<div class="scripts-container">
   {#each following as script}
      <ScriptBox script={script} />
   {/each}
</div>