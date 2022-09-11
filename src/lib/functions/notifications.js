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

export async function updateNotifs(userID){
    const profile = await supabase.from('profiles').select('following').eq('id', userID)
    let json = profile.data[0].following

    for(let element of json){
        let request = await fetch(element.api_url)
        let res = await request.json()
        if(res.updated_at != element.last_update && element.seen == true){
            element.seen = false
            element.last_update = res.updated_at
        }
    }
    const { data, error } = await supabase.from('profiles').update({ following: json }).eq('id', userID)
}

export async function readNotif(userID, scriptID){
    const profile = await supabase.from('profiles').select('following').eq('id', userID)
    let json = profile.data[0].following
    json.filter((item)=>{
        if(item.script == scriptID){
            item.seen = true
        }
    })
    var { data, error } = await supabase.from('profiles').update({ following: json }).eq('id', userID)
    return
}