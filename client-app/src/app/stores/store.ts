import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import DefectStore from "./defectStore";
import UserStore from "./userStore";

interface IStore
{
    defectStore: DefectStore;
    commonStore: CommonStore;
    userStore: UserStore;
}

export const store: IStore = {
    defectStore: new DefectStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore()
}

export const StoreContext = createContext(store);

export function useStore()
{
    return useContext(StoreContext);
}