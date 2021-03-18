import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/Agent";
import { IUser, IUserFormValues } from "../models/user";
import { store } from "./store";

export default class UserStore {
    user: IUser | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: IUserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push('/defects');
            store.modalStore.closeModal();
        }
        catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('/');
    }

    getUser = async () => {
        try 
        {
            const currUser = await agent.Account.current();
            runInAction(() => this.user = currUser)
        }
        catch(error)
        {
            console.log(error);
        }
    }

    register = async (creds: IUserFormValues) =>
    {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push('/defects');
            store.modalStore.closeModal();
        }
        catch (error) {
            throw error;
        }
    }
}