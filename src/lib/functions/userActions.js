import supabase from '$lib/db';

export async function setUsername(username, id) {
   let result;
   const { data, error } = await supabase.from('profiles').update({ 'username': username }).eq('id', id)
   if (error) {
      result = error
   }
   return result
}