import supabase from '$lib/db';

export async function load() {
   let { data, error } = await supabase.from('scripts').select('*')
   data.sort((a, b)=>{
         return a.id - b.id
   })
   let supabaseData = data.reverse()
   let most_downloaded = await supabase.from('scripts').select('*').order('downloads', { ascending: false })
   most_downloaded = most_downloaded.data.slice(0, 6);
   let recent = supabaseData.slice(0, 6);
   
   return {recent:recent, most_downloaded:most_downloaded}
}