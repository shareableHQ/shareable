import supabase from '$lib/db';


export async function post({ params, request }) {
   const body = await request.json();
   
   let githubReq = await fetch('https://api.github.com/repos/' + body.author.author_username + '/' + body.repo.repo_name + '/contents/' + body.repo.file_path)
   let json = await githubReq.json()
   
   const { data, error } = await supabase.from('scripts').insert([
      {
         name: body.title,
         download_url: json.download_url,
         type: body.type,
         repo: body.repo,
         author_id:body.author.author_id,
         author_name: body.author.author_username,
      }
   ])
   let res
   if (!error) {
      res = { status: 'success', id: data[0].id }
   } else if (!json.download_url) { 
      res = { status:'invalid url', message:'Please provide a valid GitHub repo and a valid path!'}
   }else {
      res = error
   }
   
   return {
      body: res
   }
}