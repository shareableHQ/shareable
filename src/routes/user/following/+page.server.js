import supabase from '$lib/db';

export async function load() {
    var { data, error } = await supabase.from('profiles').select('*')
    var scripts = await supabase.from('scripts').select('*')
    let dbResponse = data
    return {
        dbResponse: dbResponse,
        scripts: scripts.data
    }
}