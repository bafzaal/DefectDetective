import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/Agent";
import { IDefect } from "../models/defect";
import {v4 as uuid} from 'uuid';

export default class DefectStore
{
    defectRegistry = new Map<string, IDefect>();
    selectedDefect: IDefect | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor()
    {
        makeAutoObservable(this)
    }

    get defectsByDate()
    {
        return Array.from(this.defectRegistry.values()).sort((a, b) => 
        Date.parse(a.date) - Date.parse(b.date));
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
        }
        else
        {
            this.loadingInitial = true;
            try
            {
                defect = await agent.Defects.details(id);
                this.setDefect(defect);
                this.selectedDefect = defect;
                this.setLoadingInitial(false);
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
        defect.date = defect.date.split('T')[0];
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
        defect.id = uuid();
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