import supabase from '$lib/db';


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