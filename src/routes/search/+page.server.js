import supabase from '$lib/db';

export async function load({url}) {
   const query = url.searchParams.get('q')
   let results = []
   if(query){
      const { data, error } = await supabase.from('scripts').select('*')
      results = data.filter(element => element.name.toLowerCase().indexOf(query.toLowerCase()) != -1 )
   }
   return {
   results: results,
   query: query
}
}