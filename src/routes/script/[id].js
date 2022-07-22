import supabase from '$lib/db';

export async function get({ params }) {
   const id = params.id
   const { data, error } = await supabase.from('scripts').select('*').eq('id', id)
   let script = data[0];
   let file, readme;
   if(script){
      let fileReq = await fetch(script.download_url)
      file = await fileReq.text()
   }
   if(data.length > 0){
      if(script.repo.readme_path){
         let readmeReq = await fetch(script.repo.readme_download_url)
         readme = await readmeReq.text()
      }
   }

   return {
      body: {
         id: id,
         script: script,
         file: file,
         readme: readme
      }
   }
}