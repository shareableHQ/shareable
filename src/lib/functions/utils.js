export function startLoad() {
   document.getElementById('page').style.display = 'none'
   document.getElementsByClassName('loader')[0].style.display = 'flex'
}

export function endLoad() {
   document.getElementById('page').style.display = 'block'
   document.getElementsByClassName('loader')[0].style.display = 'none'
}