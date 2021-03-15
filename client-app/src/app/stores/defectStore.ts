import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/Agent";
import { IDefect } from "../models/defect";
import {format} from 'date-fns';

export default class DefectStore
{
    defectRegistry = new Map<string, IDefect>();
    selectedDefect: IDefect | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor()
    {
        makeAutoObservable(this)
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
            const defects = await agent.Defects.list();
            defects.forEach(defect => {
                this.setDefect(defect);
            })
            this.setLoadingInitial(false);
        }
        catch(error)
        {
            console.log(error);
            this.setLoadingInitial(false);
        }
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

    createDefect = async (defect: IDefect) =>
    {
        this.loading = true;
        try
        {
            await agent.Defects.create(defect);
            runInAction(() => {
                this.defectRegistry.set(defect.id, defect);
                this.selectedDefect = defect;
                this.editMode = false;
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

    updateDefect = async (defect: IDefect) =>
    {
        this.loading = true;
        try
        {
            await agent.Defects.update(defect);
            runInAction(() => {
                this.defectRegistry.set(defect.id, defect);
                this.selectedDefect = defect;
                this.editMode = false;
                this.loading = false;
            })
        }
        catch(error)
        {
            console.log(error);
            this.loading = false;
            runInAction(() => {
                this.loading = false;
            })
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
}