import supabase from '$lib/db';


export async function getUserRepo(username) {
   let req = await fetch(`https://api.github.com/users/${username}/repos`)
   let json = await req.json()
   return json
}