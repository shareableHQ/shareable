<script>
    import ScriptBox from '$components/ScriptBox.svelte';
    import { user } from '$lib/stores';
    import { browser } from '$app/env';
    import { Moon } from 'svelte-loading-spinners';

    export let data, scripts;
    let followingIDs = [];
    let following = [];
    if(browser){
        let filteredData = data.filter((element)=>{
            return element.id == $user.id
        })
        followingIDs = filteredData[0].following
        followingIDs.forEach(element=>{
            var script = scripts.filter(item =>{
                return item.id == element.script
            })
            following.push(script[0])
            })
        console.log(following)
    }    
</script>


<div id="loader" class="loader"><Moon size="50" color="#FF2D55" unit="px" duration="1s"></Moon></div>
<h1>Following</h1>
<div class="scripts-container">
   {#each following as script}
      <ScriptBox script={script} />
   {/each}
</div>


<style>
    .loader{
       display: none;
    }
 </style>