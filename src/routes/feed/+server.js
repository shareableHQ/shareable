import { json } from '@sveltejs/kit';
import RSS from 'rss';
import supabase from '$lib/db';

export async function GET() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // Get posts
    let {data, error} = await supabase.from('scripts').select('*')
    data.sort((a, b)=>{
            return a.id - b.id
    })
    data = data.reverse()

    let feed = new RSS({
        title: 'Shareable feed',
        feed_url: 'https://shareable.vercel.app/feed',
        site_url: 'https://shareable.vercel.app',
        image_url: 'https://shareable.vercel.app/logo.png'
    })
    data.forEach(script => {
        feed.item({
            title: `Shareable - New ${script.type.toLowerCase()} published!`,
            description: `${script.author_name} just published their new <b>${script.type.toLowerCase()}</b>: <a href="https://shareable.vercel.app/script/${script.id}">${script.name}</a>`,
            url: `https://shareable.vercel.app/script/${script.id}`,
            date: `${new Date(script.created_at).getDate()} ${months[new Date(script.created_at).getMonth()]} ${new Date(script.created_at).getFullYear()}`
        })
    });

    var xml = feed.xml();
    let options = { headers: {'Content-Type': 'application/xml'}}
    let res = new Response(xml, options)
    return res
}