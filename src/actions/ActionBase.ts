import { ReducerBase } from "../reducers/ReducerBase";

export abstract class ActionBase {
    //2. Execute Action
    public abstract Execute(): Promise<any>
    //3. Reducer Store Data
    public abstract onExecuteError(): Promise<any>

    public start(): Promise<any> {
        try {
            return this.Execute();
        } catch {
            return this.onExecuteError();
        }
    }
}