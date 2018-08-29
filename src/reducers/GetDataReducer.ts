import { ReducerBase } from "./ReducerBase";
import { ReportingStore } from "../stores/ReportingStore";
import { GetDataResponseModel } from "../models/GetDataResponseModel";

export class GetDataReducer extends ReducerBase {
    public static UpdateGridList(data: GetDataResponseModel) {
        ReportingStore.UpdateGridList(data)
    }

}