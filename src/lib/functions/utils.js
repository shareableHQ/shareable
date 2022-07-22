export function startLoad() {
   document.getElementById('page').style.display = 'none'
   document.getElementsByClassName('loader')[0].style.display = 'flex'
}

export function endLoad() {
   document.getElementsByClassName('loader')[0].style.display = 'none';
   document.getElementById('page').style.display = 'block';
}

export async function getUserRepo(username) {
   let req1 = await fetch(`https://api.github.com/users/${username}`)
   let json1 = await req1.json()
   let req = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`)
   let json = await req.json()
   if (json1.public_repos > 100) {
      let req2 = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed&page=2`)
      let json2 = await req2.json()
      json = json.concat(json2)
   }
   if (json1.public_repos > 200) {
      let req3 = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed&page=3`)
      let json3 = await req3.json()
      json = json.concat(json3)
   }
   return json
}