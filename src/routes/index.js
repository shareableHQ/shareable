import supabase from '$lib/db';

export async function get() {
   let {data, error} = await supabase.from('scripts').select('*')
   data.sort((a, b)=>{
         return a.id - b.id
   })
   data = data.reverse()
   let most_downloaded = await supabase.from('scripts').select('*').order('downloads', { ascending: false })
   most_downloaded = most_downloaded.data.slice(0, 6);
   
   return {
      body: {
         data: data,
         most_downloaded: most_downloaded
      }
   }
}