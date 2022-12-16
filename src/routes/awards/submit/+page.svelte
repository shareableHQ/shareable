<script>
    import { user } from '$lib/stores';
    export let form;
    export let data;
</script>

{#if form?.success}
<p class="not_found">Your script has been submitted!</p>
{:else}
    {#if $user && !data.error}
        {#if !form}
            <h1>Submit your work</h1>
            <p>We're excited to see your work! Please follow the steps below and submit your script!</p>

            <h2>How it works</h2>
            <ul>
                <li><span>First step:</span> Upload your script to a <b>private</b> <a href="https://gist.github.com">GitHub gist</a> (make sure you're logged in with your GitHub account!)</li>
                <li><span>Second step:</span> Copy your gist's link (once you've created the gist, just copy the page's address) and paste it below in the dedicated form.</li>
            </ul>
            <h2>Submit!</h2>
            <form method="POST">
                <div class="description-editor">
                    <div>
                        <input class="form"  type="text" name="script_title" id="script_title" placeholder="Name" required>
                        <p class="label">Choose a name for your script.</p>
                    </div>

                    <div>
                        <input class="form"  type="text" name="link" id="link" placeholder="Gist link" required>
                        <p class="label">Paste your gist's link</p>
                    </div>
                </div>
                <textarea name="description" id="" cols="30" rows="5" required></textarea>
                <p class="label">Add a description for your work!</p>

                <input type="text" style="display: none;" name="user" id="user" value={$user.id}>
                <div class="buttonArea">
                    <button id="submitButton" type="submit" class="toolButton redBrandButton">Send</button>
                </div>
            </form>
        {:else if form?.error}
            <p class="not_found">You already joined the competition!</p>
        {/if} 
    {:else if !$user && !data.error}
        <p class="not_found">You need to be logged in to join the competition!</p>
    {:else if data.error}
            <p class="not_found">Already submitted!</p>
    {/if}
{/if}


<style>
    a{
      color:#a1c4fd
   }
   span{
    opacity: 0.5;
    font-weight: 300;
   }
   textarea{
    min-width: 90%;
   }
   #submitButton{
        padding: 10px 80px;
        font-size: 16px;
        font-weight: 600;
    }
    .buttonArea{
        display: flex;
        justify-content: center;
        margin-top: 80px;
    }
</style>