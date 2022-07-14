import supabase from '$lib/db';


export async function getUserRepo(username) {
   let req1 = await fetch(`https://api.github.com/users/${username}`)
   let json1 = await req1.json()
   let req = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
   let json = await req.json()
   if (json1.public_repos > 100) {
      let req2 = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated&page=2`)
      let json2 = await req2.json()
      json = json.concat(json2)
   }
   if (json1.public_repos > 200) {
      let req3 = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated&page=3`)
      let json3 = await req3.json()
      json = json.concat(json3)
   }
   return json
}

export async function updateTitle(id, title) {
   const { data, error } = await supabase.from('scripts').update({ name: title }).eq('id', id)
   if (error) {
      return error
   }
}

export async function updateDesc(id, desc) {
   const { data, error } = await supabase.from('scripts').update({ desc: desc }).eq('id', id)
   if (error) {
      return error
   }
}

export async function updateType(id, type) {
   const { data, error } = await supabase.from('scripts').update({ type: type }).eq('id', id)
   if (error) {
      return error
   }
}

export async function removeScript(id) {
   const { data, error } = await supabase.from('scripts').delete().match({ 'id':id })
   if (error) {
      return error
   }
}