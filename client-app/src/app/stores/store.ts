import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import DefectStore from "./defectStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import UserStore from "./userStore";

interface IStore
{
    defectStore: DefectStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    profileStore: ProfileStore;
}

export const store: IStore = {
    defectStore: new DefectStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    profileStore: new ProfileStore()
}

export const StoreContext = createContext(store);

export function useStore()
{
    return useContext(StoreContext);
}