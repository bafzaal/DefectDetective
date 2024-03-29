import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/Agent";
import { DefectFormValues, IDefect } from "../models/defect";
import {format} from 'date-fns';
import { store } from "./store";
import { IProfile } from "../models/profile";
import { Pagination, PagingParams } from "../models/pagination";

export default class DefectStore
{
    defectRegistry = new Map<string, IDefect>();
    selectedDefect: IDefect | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    predicate = new Map().set('all', true);

    constructor()
    {
        makeAutoObservable(this);

        reaction(
            () => this.predicate.keys(),
            () => {
                this.pagingParams = new PagingParams();
                this.defectRegistry.clear();
                this.loadDefects();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) =>
    {
        this.pagingParams = pagingParams;
    }

    setPredicate = (predicate: string, value: string | Date) =>
    {
        const resetPredicate = () =>
        {
            this.predicate.forEach((value, key) => {
                if(key !== 'startDate')
                {
                    this.predicate.delete(key)
                }
            })
        }
        switch(predicate)
        {
            case 'all':
                resetPredicate();
                this.predicate.set('all', true);
                break;
            case 'isWorking':
                resetPredicate();
                this.predicate.set('isWorking', true);
                break;
            case 'isOwner':
                resetPredicate();
                this.predicate.set('isOwner', true);
                break;
            case 'isClosed':
                resetPredicate();
                this.predicate.set('isClosed', true);
                break;
            case 'startDate':
                this.predicate.delete('startDate');
                this.predicate.set('startDate', value);
        }
    }

    get axiosParams()
    {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        this.predicate.forEach((value, key) => {
            if(key === 'startDate')
            {
                params.append(key, (value as Date).toISOString())
            }
            else
            {
                params.append(key, value)
            }
        })
        return params;
    }

    get defectsByDate()
    {
        return Array.from(this.defectRegistry.values()).sort((a, b) => 
        a.date!.getTime() - b.date!.getTime());
    }

    get groupedDefects()
    {
        return Object.entries(
            this.defectsByDate.reduce((defects, defect) => {
                const date = format(defect.date!, 'dd MMM yyyy');
                defects[date] = defects[date] ? [...defects[date], defect] : [defect];
                return defects;
            }, {} as {[key: string]: IDefect[]})
        )
    }

    loadDefects = async () =>
    {
        this.loadingInitial = true;
        try
        {
            const result = await agent.Defects.list(this.axiosParams);
            result.data.forEach(defect => {
                this.setDefect(defect);
            })
            this.setPagination(result.pagination);
            this.setLoadingInitial(false);
        }
        catch(error)
        {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setPagination = (pagination: Pagination) =>
    {
        this.pagination = pagination;
    }

    loadDefect = async (id: string) =>
    {
        let defect = this.getDefect(id);
        if(defect)
        {
            this.selectedDefect = defect;
            return defect;
        }
        else
        {
            this.loadingInitial = true;
            try
            {
                defect = await agent.Defects.details(id);
                this.setDefect(defect);
                runInAction(() => {this.selectedDefect = defect;});
                this.setLoadingInitial(false);
                return defect;
            }
            catch(error)
            {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setDefect = (defect: IDefect) =>
    {
        const user = store.userStore.user;
        if(user)
        {
            defect.isWorking = defect.workers!.some(
                d => d.username === user.username
            )
            defect.isOwner = defect.ownerUsername === user.username;
            defect.owner = defect.workers?.find(x => x.username === defect.ownerUsername);
        }
        defect.date = new Date(defect.date!);
        this.defectRegistry.set(defect.id, defect);
    }

    private getDefect = (id: string) =>
    {
        return this.defectRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) =>
    {
        this.loadingInitial = state;
    }

    createDefect = async (defect: DefectFormValues) =>
    {
        const user = store.userStore.user;
        const worker = new IProfile(user!);
        try
        {
            await agent.Defects.create(defect);
            const newDefect = new IDefect(defect);
            newDefect.ownerUsername = user!.username;
            newDefect.workers = [worker];
            this.setDefect(newDefect);
            runInAction(() => {
                this.selectedDefect = newDefect;
            })
        }
        catch(error)
        {
            console.log(error);
        }
    }

    updateDefect = async (defect: DefectFormValues) =>
    {
        try
        {
            await agent.Defects.update(defect);
            runInAction(() => {
                if(defect.id)
                {
                    let updatedDefect = {...this.getDefect(defect.id), ...defect}
                    this.defectRegistry.set(defect.id, updatedDefect as IDefect);
                    this.selectedDefect = updatedDefect as IDefect;
                }
            })
        }
        catch(error)
        {
            console.log(error);
            this.loading = false;
        }
    }

    deleteDefect = async (id: string) =>
    {
        this.loading = true;
        try
        {
            await agent.Defects.delete(id);
            runInAction(() => {
                this.defectRegistry.delete(id);
                this.loading = false;
            })
        }
        catch(error)
        {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateWorkers = async () => 
    {
        const user = store.userStore.user;
        this.loading = true;
        try
        {
            await agent.Defects.work(this.selectedDefect!.id);
            runInAction(() => {
                if(this.selectedDefect?.isWorking)
                {
                    this.selectedDefect.workers = this.selectedDefect.workers?.filter(d => d.username !== user?.username);
                    this.selectedDefect.isWorking = false;
                }
                else
                {
                    const worker = new IProfile(user!);
                    this.selectedDefect?.workers?.push(worker);
                    this.selectedDefect!.isWorking = true;
                }
                this.defectRegistry.set(this.selectedDefect!.id, this.selectedDefect!);
            })
        }
        catch(error)
        {
            console.log(error);
        }
        finally
        {
            runInAction(() => this.loading = false)
        }
    }

    cancelDefectToggle = async () =>
    {
        this.loading = true;
        try
        {
            await agent.Defects.work(this.selectedDefect!.id);
            runInAction(() => {
                this.selectedDefect!.isClosed = !this.selectedDefect?.isClosed;
                this.defectRegistry.set(this.selectedDefect!.id, this.selectedDefect!);
            })
        }
        catch(error)
        {
            console.log(error);
        }
        finally
        {
            runInAction(() => this.loading = false);
        }
    }

    clearSelectedDefect = () => 
    {
        this.selectedDefect = undefined;
    }

    updateWorkerFollowing = (username: string) =>
    {
        this.defectRegistry.forEach(defect => {
            defect.workers.forEach(worker => {
                if(worker.username === username)
                {
                    worker.following ? worker.followersCount-- : worker.followersCount++;
                    worker.following = !worker.following;
                }
            })
        })
    }
}