import ObjectHelper from "../common/ObjectHelper";
import { ReducerBase } from "../reducers/ReducerBase";
import { StoreBaseInterface } from "./StoreInterface";

export class StoreBase implements StoreBaseInterface {
    private _source: any[] = [1,2,3,4,5,6]
    private _reducer: ReducerBase;
    
    constructor(reducer?: ReducerBase) {
        this._reducer = reducer ? reducer: new ReducerBase();
    }
    protected UpdateData(data: []) {
        this._source = data;
    }

    protected MergeData(data: [], isUnique?: boolean) {
        this._source.concat(data)
        if(isUnique) {
            //TODO later implement
        }
    }

    protected GetData() {
        return ObjectHelper.DeepCopyRecursive(this._source);
    }

    public test() {
        console.log(`constructor: ${this.constructor().name} --- Source length: ${this._source.length}`);
    }
    
}