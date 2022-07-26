import supabase from '$lib/db';

export async function get({ url }) {
   const tag = url.searchParams.get('tag')
   let data
   if(tag != 'All'){
      data = await supabase.from('scripts').select('*').eq('type', tag)
      data = data.data
      data.sort((a, b)=>{
            return a.id - b.id
         })         
      data = data.reverse()
   }else{
      data = await supabase.from('scripts').select('*').not('type', 'eq', 'Script')
      data = data.data
      data.sort((a, b)=>{
            return a.id - b.id
         })         
      data = data.reverse()
   }
   
   return {
      body: {
         tag: tag,
         data: data
      }
   }
}