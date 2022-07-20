import supabase from '$lib/db';

export async function get({ params }) {
   const id = params.id
   let { data, error } = await supabase.from('scripts').select('*').eq('author_id', id)
   const username = data[0].author_name
   let req = await fetch('https://api.github.com/users/' + username)
   let res = await req.json()

   // Calculate downloads
   let totalDownloads = 0;
   data.forEach((script) => {
      totalDownloads += script.downloads
   })

   var user_metadata = {
      username: username,
      avatar: res.avatar_url,
      totalDownloads: totalDownloads
   }

   return {
      body: {
         data: data,
         user_metadata: user_metadata
      }
   }
}