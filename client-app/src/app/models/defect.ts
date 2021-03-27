import { IProfile } from "./profile";

export interface IDefect {
    id: string;
    title: string;
    date: Date | null;
    description: string;
    category: string;
    priority: string;
    status: string;
    ownerUsername?: string;
    isClosed?: boolean;
    isGoing?: boolean;
    isOwner?: boolean;
    owner?: IProfile;
    workers?: IProfile[]
  }