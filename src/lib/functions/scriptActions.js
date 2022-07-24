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