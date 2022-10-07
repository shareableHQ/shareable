import { getUserRepo } from '../../lib/functions/scriptUtilities';
import supabase from '$lib/db';
export async function load(){
   let items = []
   let username, id
   try{
      username = supabase.auth.user().user_metadata.user_name
      id = supabase.auth.user().id
      items = await getUserRepo(username)
   }catch{}
   return { items, username, id }
}