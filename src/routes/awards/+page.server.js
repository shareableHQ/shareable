import supabase from '$lib/db';

export async function load({ params }) {
    const startDate = '2022-12-19'
    const endDate = '2022-12-26'
    const today = new Date().toISOString().split('T')[0]
    const isBefore = isBeforeDate(today, startDate)
    const isAfter = isAfterDate(today, endDate)
    const isDuring = !isBefore && !isAfter
    let theme = ''
    if(isDuring){
        theme = 'Countdown'
    }
    return { isBefore, isAfter, isDuring, theme }
}

function isBeforeDate(date, beforeDate) {
    return new Date(date).getTime() < new Date(beforeDate).getTime();
}
function isAfterDate(date, afterDate) {
    return new Date(date).getTime() > new Date(afterDate).getTime();
}