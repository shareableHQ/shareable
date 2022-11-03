import supabase from '$lib/db';
import cheerio from 'cheerio';
import { marked } from 'marked';


export async function load({ params }) {
   const id = params.id
   var { data, error } = await supabase.from('scripts').select('*').eq('id', id)
   let script = data[0];
   let file, readme = '';
   if(script){
      let fileReq = await fetch(script.download_url)
      file = await fileReq.text()
   }
   if(data.length > 0){
      if(script.repo.readme_path){
         try{
            let readmeReq = await fetch(script.repo.readme_download_url)
            readme = await readmeReq.text()
         }catch(e){
            readme = ''
         }
      }
   }
   var { data, error } = await supabase.from('stars').select('*').eq('script_starred', id)
   let starsObj = data
   let stars = data.length

   var { data, error } = await supabase.from('reports').select('*').eq('script', id)
   let reports = data

   marked.setOptions({ mangle:false })
   let source = ''
   if(script){
      source = marked.parse(readme)
      const $ = cheerio.load(source);
      let branch = script.download_url.replace(`https://raw.githubusercontent.com/${script.author_name}/${script.repo.repo_name}`, '').replace(`/${script.repo.filename}`.replace(/ /g, '%20'), '').replace('/', '')
      $('img').each(function (i, elem) {
         console.log($(this).attr('src'), branch)
         if($(this).attr('src').indexOf('http') == -1){
            var url = `https://raw.githubusercontent.com/${script.author_name}/${script.repo.repo_name}/${branch}/`
            source = source.replace(`src="${$(this).attr('src')}"`, `src="${url}${$(this).attr('src')}"; style="max-width:100%"`)
         }else if($(this).attr('src').indexOf('blob') != -1){
            source = source.replace(`src="${$(this).attr('src')}"`, `src="${$(this).attr('src')}?raw=true"; style="max-width:100%"`)
         }
      });
   }
    
    let link = "data:text/javascript;charset=utf-8," + encodeURIComponent(file);

   return {
      id: id,
      script: script,
      file: file,
      readme: source,
      stars: stars,
      starsObj: starsObj,
      reports: reports,
      generated_download_link: link
   }
}
