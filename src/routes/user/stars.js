import supabase from '$lib/db';

export async function get() {
   var { data, error } = await supabase.from('stars').select('*')
   var scripts = await supabase.from('scripts').select('*')
   return {
      body: {
         data: data,
         scripts: scripts.data
      }
   }
}