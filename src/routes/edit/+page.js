import supabase from '$lib/db';
export async function load({url}){
   const scriptID = url.searchParams.get('id')
   let error = null
   let authorID;
   let data;
   let script;
   try{
      authorID = supabase.auth.user().id
   }catch{}
   data = await supabase.from('scripts').select('*').eq('id', scriptID).eq('author_id',authorID)      
   if(!data || data.error){
      error = 'Missing authorization'
   }else{
      script = data.data[0]
   }
   return { scriptID, error, script }
}
