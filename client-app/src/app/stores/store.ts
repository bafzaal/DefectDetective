import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import DefectStore from "./defectStore";

interface IStore
{
    defectStore: DefectStore;
    commonStore: CommonStore;
}

export const store: IStore = {
    defectStore: new DefectStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore()
{
    return useContext(StoreContext);
}