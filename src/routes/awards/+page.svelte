<script>
    import { user } from '$lib/stores';
    export let data;
    let { isBefore, isAfter, isDuring, theme } = data
</script>

<div class="title">
    <h3>Welcome to the</h3>
    <h1>Shareable Awards</h1>
    <h3 id="subtitle">First edition</h3>
</div>
<p>Shareable is hosting a coding competition! From a given theme, all users are invited to create and submit their own widget or script before the closing date. After that, the winner will be announced and all submitted scripts will be published on Shareable with a special badge. No specific knowledge is required, the aim of this initiative is to have fun and create a better community!</p>
<h2>The challenge</h2>
<p>Given a theme, you have one week to think and write a script or a widget that matches this theme, but with all the freedom you want to extend and interpret it as you want. </p>
<p>The theme will be revealed as soon as the the competition has started!</p>


{#if isBefore}
    <div class="buttonArea">
        <div class="dateArea hover">
            <h2>From 19th to 23th December</h2>
        </div>
        <button disabled={!isDuring} on:click={()=>{window.location.href = '/awards/submit'}} id="submitButton" type="submit" class="toolButton redBrandButton">Join</button>
    </div>
{:else if isDuring}
<div class="buttonArea">
    <div class="dateArea">
        <h2>Theme is <b>Countdown</b>. Ends on 23th December</h2>
    </div>
    <button disabled={!isDuring} on:click={()=>{window.location.href = '/awards/submit?user=' + $user.id}} id="submitButton" type="submit" class="toolButton redBrandButton">Join</button>
</div>
{:else if isAfter}
<div class="dateArea">
    <h2>Competition closed!</h2>
</div>
<br>
{/if}


<style>
    .dateArea{
        display: flex;
        justify-content: center;
    }
    .dateArea > h2{
        font-size: 20px;
        font-weight: 500;
        padding:10px;
        background-color: #FF2D551a;
        color:#FF2D55;
        border-radius: 10px;
        transition: 400ms;
    }
    .dateArea > h2:hover{
        -webkit-box-shadow:0 0 20px #FF2D55; 
        -moz-box-shadow: 0 0 20px #FF2D55; 
        box-shadow:0 0 20px #FF2D55;
        transition: 400ms;
    }
    .buttonArea > button:hover{
        -webkit-box-shadow:0 0 20px #FF2D55; 
        -moz-box-shadow: 0 0 20px #FF2D55; 
        box-shadow:0 0 20px #FF2D55;
        transition: 400ms;
    }
    .buttonArea > button{
        transition: 1s;
    }
    :disabled{
        opacity: 0.7;
        cursor: not-allowed;
    }
    p{ font-size: 16.5px; font-weight: 400; }
    .title{
        text-align: center;
    }
    h1{
        margin-top: -20px;
        font-size: 45px;
    }
    #subtitle{
        margin-top: -25px;
        opacity: 0.5;
        padding-bottom: 20px;
    }
    h3{
        opacity: 0.5;
        font-weight: 400;
    }
    #submitButton{
        padding: 10px 80px;
        font-size: 16px;
        font-weight: 600;
    }
    .buttonArea{
        display: flex;
        justify-content: space-evenly ;
        align-items: baseline;
        padding-top: 30px;
        flex-wrap: wrap;
    }
</style>