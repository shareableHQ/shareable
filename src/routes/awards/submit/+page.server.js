import supabase from '$lib/db';
import { redirect } from '@sveltejs/kit';

export async function load({ url }) {
    const userID = url.searchParams.get('user')
    const { data, error } = await supabase.from('awards').select('*').eq('user', userID);
    if (data.length > 0) {
        return { error: true }
    }

    const startDate = '2022-12-19'
    const endDate = '2022-12-31'
    const today = new Date().toISOString().split('T')[0]
    const isBefore = isBeforeDate(today, startDate)
    const isAfter = isAfterDate(today, endDate)
    const isDuring = !isBefore && !isAfter
    if(!isDuring){
        throw redirect(302, '/awards')
    }
}

function isBeforeDate(date, beforeDate) {
    return new Date(date).getTime() < new Date(beforeDate).getTime();
}
function isAfterDate(date, afterDate) {
    return new Date(date).getTime() > new Date(afterDate).getTime();
}

export const actions = {
	async default(event){
        const { request } = event;
        const formData = await request.formData();
        const title = formData.get('script_title')
        const link = formData.get('link')
        const description = formData.get('description')
        const user = formData.get('user');

        var { data, error } = await supabase.from('awards').select('*').eq('user', user);
        console.log(data.length)
        if (data.length > 0) {
            return { error: true }
        }
        var { data, error } = await supabase.from('awards').insert({ title, user, link, description })
        return { 
            error: false, 
            success: true 
        }
    }
}
