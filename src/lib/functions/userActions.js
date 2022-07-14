import supabase from '$lib/db';


export async function getUserRepo(username) {
   let req = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
   let json = await req.json()
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