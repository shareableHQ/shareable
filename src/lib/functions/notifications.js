import supabase from '$lib/db';

export async function loadNotifs(userID){
    const profile = await supabase.from('profiles').select('following').eq('id', userID)
    let json = profile.data[0].following
    let notifications = json.filter((notif)=>{
        return notif.seen == false
    })
    return notifications
}

export async function loadAllNotifs(userID){
    const profile = await supabase.from('profiles').select('following').eq('id', userID)
    let json = profile.data[0].following
    return json
}
