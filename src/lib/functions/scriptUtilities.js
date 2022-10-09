import supabase from '$lib/db';


export async function updateVersion(scriptID, newVersion, release_notes){ //valid for enabling updater too
   var { data, error } = await supabase.from('scripts').select('*').eq('id', scriptID)
   data = data[0]

   var obj = {
      isUpdaterEnabled: true,
      version: String(newVersion),
      release_notes: release_notes,
      download_link: `https://shareable.vercel.app/api/download?id=${scriptID}`
   }

   var { data, error } = await supabase.from('scripts').update({ updater: obj }).eq('id', scriptID)
   if (error) {
      return error
   }
}

export async function getUserRepo(username) {
   let req1 = await fetch(`https://api.github.com/users/${username}`)
   let json1 = await req1.json()
   let req = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`)
   let json = await req.json()
   if (json1.public_repos > 100) {
      let req2 = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed&page=2`)
      let json2 = await req2.json()
      json = json.concat(json2)
   }
   if (json1.public_repos > 200) {
      let req3 = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed&page=3`)
      let json3 = await req3.json()
      json = json.concat(json3)
   }
   return json
}

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