import axios, { AxiosResponse } from 'axios';
import { IDefect } from '../models/defect';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Defects = {
    list: () => requests.get<IDefect[]>('/defects'),
    details: (id: string) => requests.get<IDefect>(`/defects/${id}`),
    create: (defect: IDefect) => requests.post<void>('/defects', defect),
    update: (defect: IDefect) => requests.put<void>(`/defects/${defect.id}`, defect),
    delete: (id: string) => requests.del<void>(`/defects/${id}`)
}

const agent = {
    Defects
}

export default agent;