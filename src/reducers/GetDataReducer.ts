import { ReducerBase } from "./ReducerBase";
import { ReportingStore } from "../stores/ReportingStore";
import { GetDataResponseModel } from "../models/GetDataResponseModel";
import { GridSchema } from "../models/GridSchema";

export class GetDataReducer extends ReducerBase {
    public static UpdateGridList(data: GetDataResponseModel) {
        ReportingStore.UpdateGridList(data)
    }

    public static UpdateGridSchema(data: GridSchema) {
        ReportingStore.UpdateGridSchema(data)
    }

    public static GetGridSchema(): GridSchema {
        return ReportingStore.GetGridSchema()
    }

    public static GetResponseData(): GetDataResponseModel {
        return ReportingStore.GetResponseData()
    }
}