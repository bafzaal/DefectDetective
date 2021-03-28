import { IProfile } from "./profile";

export interface IDefect {
    id: string;
    title: string;
    date: Date | null;
    description: string;
    category: string;
    priority: string;
    status: string;
    ownerUsername: string;
    isClosed: boolean;
    isWorking: boolean;
    isOwner: boolean;
    owner?: IProfile;
    workers: IProfile[]
  }

  export class IDefect implements IDefect
  {
    constructor(init?: DefectFormValues)
    {
      Object.assign(this, init);
    }
  }

  export class DefectFormValues {
    id?: string = undefined;
    title: string = '';
    category: string = '';
    description: string = '';
    date: Date | null = null;
    priority: string = '';
    status: string = '';

    constructor(defect?: DefectFormValues)
    {
      if(defect)
      {
        this.id = defect.id;
        this.title = defect.title;
        this.category = defect.category;
        this.description = defect.description;
        this.date = defect.date;
        this.priority = defect.priority;
        this.status = defect.status;
      }
    }
  }