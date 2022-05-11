<script>
   import { closeModal } from 'svelte-modals'
   import Select from 'svelte-select';
   import { updateTitle, updateDesc, updateType } from '../lib/functions/userActions';
   import { getNotificationsContext } from 'svelte-notifications';
   const { addNotification } = getNotificationsContext();
   
   export let script
   // provided by <Modals />
   export let isOpen
   
   let parameter = 'Title';
   let title = script.name;
   let desc = script.desc;
   let type = script.type

   function handleSelect(event){
      parameter = event.detail.value
   }
   function handleSelect2(event){
      type = event.detail.value
   }
   async function invokeUpdateTitle(){
      let res = await updateTitle(script.id, title)
      if(res){
         alert(res.message)
      }else{
         window.location.reload()
      }
   }
   async function invokeUpdateDesc(){
      let res = await updateDesc(script.id, desc)
      if(res){
         alert(res.message)
      }else{
         window.location.reload()
      }
   }
   async function invokeUpdateType(){
      let res = await updateType(script.id, type)
      if(res){
         alert(res.message)
      }else{
         window.location.reload()
      }
   }
</script>
 
{#if isOpen}
<div role="dialog" class="modal">
   <div class="contents">
      <h2>Edit your script</h2>
      <div>
         <div class="themed"><Select value="Title" placeholder="What do you want to edit?" on:select={handleSelect} items={['Title', 'Description', 'Type']}></Select></div>
         {#if parameter == 'Title'}
            <form on:submit|preventDefault={invokeUpdateTitle}>
               <br>
               <input type="text" class="form" placeholder="Script name" required="required" bind:value={title}><br>
               <button id="submitButton" type="submit" class="toolButton redBrandButton">Edit</button>
            </form>
         {:else if parameter == 'Description'}
            <form on:submit|preventDefault={invokeUpdateDesc}>
               <br>
               <textarea class="form textarea" cols="30" rows="20" bind:value={desc}></textarea><br>
               <button id="submitButton" type="submit" class="toolButton redBrandButton">Edit</button>
            </form>
         {:else if parameter == 'Type'}
            <form on:submit|preventDefault={invokeUpdateType}>
               <br>
               <div class="themed"><Select value={type} placeholder="Select type" on:select={handleSelect2} items={['Script', 'Widget']}></Select></div>
               <button id="submitButton" type="submit" class="toolButton redBrandButton">Edit</button>
            </form>
         {/if} 
      </div>
      <div class="actions">
      <button class="toolButton" on:click={closeModal}>Cancel</button>
      </div>
   </div>
</div>
{/if}
 
<style>
   .themed{
      --background:#262626;
      --listBackground:#262626;
   }
   .form{
      background-color: #262626;
   }
   .modal {
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      /* allow click-through to backdrop */
      pointer-events: none;
   }

   .contents {
      min-width: 240px;
      border-radius: 6px;
      padding: 16px;
      background: #333333;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      pointer-events: auto;
      color:white
   }

   h2 {
      text-align: center;
      font-size: 24px;
   }

   p {
      text-align: center;
      margin-top: 16px;
   }

   .actions {
      margin-top: 32px;
      display: flex;
      justify-content: flex-end;
   }

</style>