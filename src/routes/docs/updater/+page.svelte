<script>
    import { onMount } from "svelte";
    import Footer from "../../../lib/components/Footer.svelte";
    onMount(()=>{
        // highlight.js
        document.querySelectorAll('pre code').forEach((el)=>{
            hljs.highlightElement(el);
        })
    })
    const code = `// Your script

    const updaterModule = importModule("semver") // @FifiTheBulldog's updater module: check below for download

    const version = "1.1" // The current installed version
    const id = 1 // Your script's shareable id
    let request = await new Request("https://shareable.vercel.app/api/updater?id=" + id)
    let json = await request.loadJSON()

    const checkForUpdates = updaterModule(version, json.version)
    
    if(checkForUpdates == true){
        log("Update available!")
        Safari.open(json.download_link)  
    }else if(checkForUpdates == null){
        log("Up to date!")
    }else if(checkForUpdates == false){
        log("Rollback available!")
    }`
</script>

<svelte:head>
    <title>Updater docs</title>
</svelte:head>

<h1>Updater documentation</h1>
<p>Shareable now offers a <b>built-in</b> way to keep your scripts up to date, and to notify your users when you publish a new update for your script.</p>

<h2>How does it work</h2>
<p>The updater is <b>disabled by default</b> for all scripts, but an author can enable it at any time in a script's page. Enabling the updater for a script means that an <b>API endpoint</b> will be available for your script: from this url anyone can retrieve the latest version of your script, alongside with <i>release notes</i> and a <i>download link</i> for a quick and easy update.</p>

<h2>How to use the updater for my script</h2>
<p>Using the updater is simple:</p>

<pre lang="javascript"><code>{code}</code></pre>

<h3>Updater module</h3>
<p>This module, that needs to be installed as a Scriptable script, makes possible to use <b>semantic versioning (like 2.0.3)</b>: you can download it on GitHub at <a href="https://gist.github.com/FifiTheBulldog/a44e711389847596abefb4bbddcc5e37">this link</a></p>
<p>All credits to <a href="https://github.com/FifiTheBulldog">FifiTheBulldog</a> for this script.</p>

<h2>The API is public, so anyone can write their own approach</h2>
<p>Shareable's updater api is public, so you can write your own updater module: here's some informations that may be useful:</p>
<pre lang="javascript">
    <code>
        // URL
        const baseUrl = "https://shareable.vercel.app/api/updater" // takes id as a parameter
        const url = "https://shareable.vercel.app/api/updater?id=1"
    </code>
    <code>
        // Response is a JSON object
        isUpdaterEnabled: Boolean
        version: String
        release_notes: String
        download_link: String // url that redirects to script's page after starting the download of the script 
    </code>
</pre>


<Footer />


<style>
    a{
      color:#a1c4fd
   }
</style>