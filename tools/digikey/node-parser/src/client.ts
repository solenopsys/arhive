import {CONTROLLER_API} from "./index";

export interface Job {
    id: number,
    url: string,
    components: number
}

export async function getJob(): Promise<Job> {
    const response = await fetch(CONTROLLER_API + '/job/get');
    const data = await response.json();
    console.log("GET URL", data)
    return data as Job;
}

export async function updateJob(id: number, component: number): Promise<boolean> {
    const response = await fetch(CONTROLLER_API + `/job/update?id=${id}&components=${component}`);
    return response.status === 200
}

export async function savePage(data: string, id: number, start: number, end: number) {
    console.log("SAVE PAGE", id)
    // http post request
    let url:string = `${CONTROLLER_API}/data/save?id=${id}&start=${start}&end=${end}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })

    return response;
}
