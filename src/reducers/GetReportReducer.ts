import { ReducerBase } from "./ReducerBase";
import { ReportTypeModel } from "../models/ReportTypeModel";
import { ReportingStore } from "../stores/ReportingStore";

export class GetReportReducer extends ReducerBase {
    public static UpdateReportList(data: ReportTypeModel[]) {
        ReportingStore.UpdateData(data)
    }

   
}