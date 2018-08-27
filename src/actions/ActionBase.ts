import { ReducerBase } from "../reducers/ReducerBase";

export abstract class ActionBase {
    //1. Init Action
    public constructor(){}
    //2. Execute Action
    public abstract Execute(): Promise<any>
    //3. Reducer Store Data
    public abstract onExecuted(state: ReducerBase) : Promise<any>
    //4. Execute Error
    public abstract onExecuteError(): Promise<any>
}