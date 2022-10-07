import supabase from '$lib/db';

export async function load({ params }) {
    const id = params.id
    let { data, error } = await supabase.from('scripts').select('*').eq('author_id', id)
    let user_metadata;
    if (data.length != 0) {
        const username = data[0].author_name
        let req = await fetch('https://api.github.com/users/' + username)
        let res = await req.json()

        // Calculate downloads
        let totalDownloads = 0;
        data.forEach((script) => {
            totalDownloads += script.downloads
        })

        user_metadata = {
            username: username,
            avatar: res.avatar_url,
            totalDownloads: totalDownloads,
            user_id: id
        }
    } else {
        user_metadata = {
            username: null,
            avatar: null,
            totalDownloads: null,
            user_id: id
        }
    }
    let dbResponse = data

    return {
        dbResponse: dbResponse,
        user_metadata: user_metadata
    }
}