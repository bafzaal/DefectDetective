import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { IDefect } from '../models/defect';
import { IUser, IUserFormValues } from '../models/user';
import { store } from '../stores/store';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response!;
    switch(status)
    {
        case 400: 
            if(typeof data === 'string')
            {
                toast.error(data);
            }
            if(config.method === 'get' && data.errors.hasOwnProperty('id'))
            {
                history.push('/not-found');
            }
            if(data.errors)
            {
                const modalStateErrors = [];
                for (const key in data.errors)
                {
                    if(data.errors[key])
                    {
                        modalStateErrors.push(data.errors[key]);
                    }
                }
                throw modalStateErrors.flat()
            }
            break;
        case 401:
            toast.error('Unauthorized');
            break;
        case 404:
            toast.error("Not Found");
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Defects = {
    list: () => requests.get<IDefect[]>('/defects'),
    details: (id: string) => requests.get<IDefect>(`/defects/${id}`),
    create: (defect: IDefect) => requests.post<void>('/defects', defect),
    update: (defect: IDefect) => requests.put<void>(`/defects/${defect.id}`, defect),
    delete: (id: string) => requests.del<void>(`/defects/${id}`)
}

const Account = {
    current: () => requests.get<IUser>('/account'),
    login: (user: IUserFormValues) => requests.post<IUser>('/account/login', user),
    register: (user: IUserFormValues) => requests.post<IUser>('/account/register', user)
}

const agent = {
    Defects, Account
}

export default agent;