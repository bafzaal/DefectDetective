import { createContext, useContext } from "react";
import DefectStore from "./defectStore";

interface IStore
{
    defectStore: DefectStore
}

export const store: IStore = {
    defectStore: new DefectStore()
}

export const StoreContext = createContext(store);

export function useStore()
{
    return useContext(StoreContext);
}