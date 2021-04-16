import { makeAutoObservable, runInAction } from "mobx";
import { IChatComment } from "../models/comment";
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { store } from "./store";

export default class CommentStore
{
    comments: IChatComment[] = [];
    hubConnection: HubConnection | null = null;

    constructor()
    {
        makeAutoObservable(this);
    }

    createHubConnection = (defectId: string) =>
    {
        if(store.defectStore.selectedDefect)
        {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl('http://localhost:5000/chat?defectId=' + defectId, {
                    accessTokenFactory: () => store.userStore.user?.token!
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

            this.hubConnection.start().catch(error => console.log('Error establishing the connection: ', error));

            this.hubConnection.on('LoadComments', (comments: IChatComment[]) => {
                runInAction(() => this.comments = comments);
            })

            this.hubConnection.on('ReceiveComment', (comment: IChatComment) => {
                runInAction(() => this.comments.push(comment));
            })
        }
    }

    stopHubConnection = () => 
    {
        this.hubConnection?.stop().catch(error => console.log('Error stopping connection: ', error));
    }

    clearComments = () =>
    {
        this.comments = [];
        this.stopHubConnection();
    }

    addComment = async (values: any) =>
    {
        values.defectId = store.defectStore.selectedDefect?.id;
        try
        {
            await this.hubConnection?.invoke('SendComment', values);
        }
        catch(error)
        {
            console.log(error);
        }
    }
}