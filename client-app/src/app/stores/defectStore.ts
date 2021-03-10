import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/Agent";
import { IDefect } from "../models/defect";
import {v4 as uuid} from 'uuid';

export default class DefectStore
{
    defects: IDefect[] = [];
    selectedDefect: IDefect | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor()
    {
        makeAutoObservable(this)
    }

    loadDefects = async () =>
    {
        this.setLoadingInitial(true);
        try
        {
            const defects = await agent.Defects.list();
            defects.forEach(defect => {
                defect.date = defect.date.split('T')[0];
                this.defects.push(defect);
            })
            this.setLoadingInitial(false);
        }
        catch(error)
        {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) =>
    {
        this.loadingInitial = state;
    }

    selectDefect = (id: string) =>
    {
        this.selectedDefect = this.defects.find(d => d.id === id);
    }

    cancelSelectedDefect = () => 
    {
        this.selectedDefect = undefined;
    }

    openForm = (id?: string) =>
    {
        id ? this.selectDefect(id) : this.cancelSelectedDefect();
        this.editMode = true;
    }

    closeForm = () =>
    {
        this.editMode = false;
    }

    createDefect = async (defect: IDefect) =>
    {
        this.loading = true;
        defect.id = uuid();
        try
        {
            await agent.Defects.create(defect);
            runInAction(() => {
                this.defects.push(defect);
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
                this.defects = [...this.defects.filter(d => d.id !== defect.id), defect];
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
                this.defects = [...this.defects.filter(d => d.id !== id)];
                if (this.selectedDefect?.id === id) this.cancelSelectedDefect();
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