import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/Agent";
import { IPhoto, IProfile } from "../models/profile";
import { store } from "./store";

export default class ProfileStore {
    profile: IProfile | null = null;
    loadingProfile = false;
    uploading = false;
    loading = false;
    followings: IProfile[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    get isCurrentUser() {
        if (store.userStore.user && this.profile) {
            return store.userStore.user.username === this.profile.username;
        }
        return false;
    }

    loadProfile = async (username: string) => {
        this.loadingProfile = true;
        try {
            const profile = await agent.Profiles.get(username);
            runInAction(() => {
                this.profile = profile;
                this.loadingProfile = false;
            });
        }
        catch (error) {
            console.log(error);
            runInAction(() => this.loadingProfile = false);
        }
    }

    uploadPhoto = async (file: Blob) => {
        this.uploading = true;
        try {
            const response = await agent.Profiles.uploadPhoto(file);
            const photo = response.data;
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos?.push(photo);
                    if (photo.isMain && store.userStore.user) {
                        store.userStore.setImage(photo.url);
                        this.profile.image = photo.url;
                    }
                }
                this.uploading = false;
            })
        }
        catch (error) {
            console.log(error);
            runInAction(() => this.uploading = false);
        }
    }

    setMainPhoto = async (photo: IPhoto) => {
        this.loading = true;
        try {
            await agent.Profiles.setMainPhoto(photo.id);
            store.userStore.setImage(photo.url);
            runInAction(() => {
                if (this.profile && this.profile.photos) {
                    this.profile.photos.find(p => p.isMain)!.isMain = false;
                    this.profile.photos.find(p => p.id === photo.id)!.isMain = true;
                    this.profile.image = photo.url;
                    this.loading = false;
                }
            })
        }
        catch (error) {
            runInAction(() => this.loading = false);
            console.log(error);
        }
    }

    deletePhoto = async (photo: IPhoto) => {
        this.loading = true;
        try {
            await agent.Profiles.deletePhoto(photo.id);
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos = this.profile.photos?.filter(p => p.id !== photo.id);
                    this.loading = false;
                }
            })
        }
        catch (error) {
            runInAction(() => this.loading = false);
            console.log(error);
        }
    }

    updateProfile = async (profile: Partial<IProfile>) => {
        this.loading = true;
        try {
            await agent.Profiles.updateProfile(profile);
            runInAction(() => {
                if (profile.displayName && profile.displayName !== store.userStore.user?.displayName) 
                {
                    store.userStore.setDisplayName(profile.displayName);
                }
                this.profile = { ...this.profile, ...profile as IProfile };
                this.loading = false;
            })
        }
        catch (error) {
            runInAction(() => this.loading = false);
            console.log(error);
        }
    }

    updateFollowing = async (username: string, following: boolean) =>
    {
        this.loading = true;
        try
        {
            await agent.Profiles.updateFollowing(username);
            store.defectStore.updateWorkerFollowing(username);
            runInAction(() => {
                if(this.profile && this.profile.username !== store.userStore.user?.username)
                {
                    following ? this.profile.followersCount++ : this.profile.followersCount--;
                    this.profile.following = !this.profile.following;
                }
                this.followings.forEach(profile => {
                    if(profile.username === username)
                    {
                        profile.following ? profile.followersCount-- : profile.followersCount++;
                        profile.following = !profile.following;
                    }
                })
                this.loading = false;
            });
        }
        catch(error)
        {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }
}