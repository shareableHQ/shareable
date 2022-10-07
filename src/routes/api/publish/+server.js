import { json as json$1 } from '@sveltejs/kit';
import supabase from '$lib/db';


export async function POST({ params, request }) {
    const body = await request.json();
   
    let githubReq = await fetch('https://api.github.com/repos/' + body.author.author_username + '/' + body.repo.repo_name + '/contents/' + body.repo.file_path)
    let json = await githubReq.json()

    let readmeReq = await fetch('https://api.github.com/repos/' + body.author.author_username + '/' + body.repo.repo_name + '/contents/' + body.repo.readme_path)
    let readmeJSON = await readmeReq.json()

    let script = {
        name: body.title,
        download_url: json.download_url,
        type: body.type,
        repo: body.repo,
        author_id:body.author.author_id,
        author_name: body.author.author_username,
        desc: body.desc
    }
    script.repo.filename = json.name
    script.repo.readme_download_url = readmeJSON.download_url
    const { data, error } = await supabase.from('scripts').insert([
        script
    ])
    let res
    if (!error) {
        res = { status: 'success', id: data[0].id }
        let message = `${body.author.author_username} just published their new **${body.type.toLowerCase()}**: [${body.title}](https://shareable.vercel.app/script/${data[0].id}).`
        let discordMessage = {
                'content':message
                }
        let discordReq = await fetch(`https://discord.com/api/webhooks/${import.meta.env.VITE_DISCORD_WEBHOOK}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(discordMessage)
        })
    } else if (!json.download_url) { 
        res = { status:'invalid url', message:'Please provide a valid GitHub repo and a valid path!'}
    }else {
        res = error
    }
   
   return json$1(res);
}