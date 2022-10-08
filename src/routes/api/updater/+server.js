import supabase from '$lib/db';
import { redirect, json } from '@sveltejs/kit';

// version: String

export async function GET({ url }){
    const id = url.searchParams.get('id')
    let { data, error } = await supabase.from('scripts').select('*').eq('id', id)
    data = data[0]
    if(!id || error){
        return json({'error':'No valid ID was provided.'})
    }else{
        let updaterData = data.updater

        if(!updaterData.isUpdaterEnabled){
            return new Response("Updater not enabled for this script. Check documentation for more informations.")
        }else{
            let updaterData = data.updater
            updaterData.download_link = `https://shareable.vercel.app/api/download?id=${id}`
            return json(updaterData)
        }
    }
}
