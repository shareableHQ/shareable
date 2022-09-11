import supabase from '$lib/db';


export async function follow(scriptID, userID) {
   var { data, error } = await supabase.from('scripts').select('*').eq('id', scriptID)
   let owner = data[0].author_name
   let repoName = data[0].repo.repo_name
   let name = data[0].name
   const url = `https://api.github.com/repos/${owner}/${repoName}`
   let request = await fetch(url)
   let res = await request.json()
   let updated_at = res.pushed_at

   const profile = await supabase.from('profiles').select('following').eq('id', userID)
   let json = profile.data[0].following
   var obj = {
      script: scriptID,
      api_url: url,
      scriptName: name,
      last_update: updated_at,
      seen: true
   }
   json.push(obj)
   var { data, error } = await supabase.from('profiles').update({ following: json }).eq('id', userID)
   if (error) {
      return error
   }
}

export async function unfollow(scriptID, userID) {
   const profile = await supabase.from('profiles').select('following').eq('id', userID)
   let json = profile.data[0].following
   json = json.filter((item) => {
      return item.script != scriptID
   })
   const { data, error } = await supabase.from('profiles').update({ following: json }).eq('id', userID)
   if (error) {
      return error
   }
}

export async function star(scriptID, userID) { 
   const { data, error } = await supabase.from('stars').insert([{
      script_starred: scriptID,
      stargazer: userID
   }])
   if (error) {
      return error
   }
}

export async function unstar(scriptID, userID) {
   const { data, error } = await supabase.from('stars').delete().eq('script_starred', scriptID).eq('stargazer', userID)
   if (error) {
      return error
   }
}

export async function report(scriptID, userID, username, message) {
   const { data, error } = await supabase.from('reports').insert([{
      author_id: userID,
      author_username: username,
      script: scriptID,
      message: message
   }])
   if (error) {
      return error
   }
}