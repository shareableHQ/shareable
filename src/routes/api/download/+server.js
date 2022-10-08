import supabase from '$lib/db';
import { json } from '@sveltejs/kit';

export async function GET({ url }){
    const id = url.searchParams.get('id')
    console.log(id)
    let { data, error } = await supabase.from('scripts').select('*').eq('id', id)
    if(!id || error || data.length == 0){
        return json({'error':'No valid ID was provided.'})
    }else{
        data = data[0]
        let fileReq = await fetch(data.download_url)
        let file = await fileReq.text()
        let link = "data:text/javascript;charset=utf-8," + encodeURIComponent(file);
        let redirectUrl = 'https://shareable.vercel.app/script/' + id
        let js = `
            window.onload = function onLoad(){
                document.getElementById("id").click()
                setTimeout(()=>{
                    window.location.href = "${redirectUrl}"
                }, 200)
            }
        `
        let html = `<html><body><a href=${link} download=${data.repo.filename.split('.')[0]} id="id" style="display=none;"> </a></body><script>${js}</script></html>`
        let options = { headers: { 'Content-Type':'text/html; charset=UTF-8' }}
        return new Response(html, options)
    }

}