import supabase from '$lib/db';

export async function get({ params }) {
   const id = params.id
   var { data, error } = await supabase.from('scripts').select('*').eq('id', id)
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
   var { data, error } = await supabase.from('stars').select('*').eq('script_starred', id)
   let starsObj = data
   let stars = data.length

   var { data, error } = await supabase.from('reports').select('*').eq('script', id)
   let reports = data


   return {
      body: {
         id: id,
         script: script,
         file: file,
         readme: readme,
         stars: stars,
         starsObj: starsObj,
         reports: reports
      }
   }
}