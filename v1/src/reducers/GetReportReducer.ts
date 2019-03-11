import { ReducerBase } from "./ReducerBase";
import { ReportTypeModel } from "../models/ReportTypeModel";
import { ReportingStore } from "../stores/ReportingStore";
import { GetDataResponseModel } from "../models/GetDataResponseModel";

export class GetReportReducer extends ReducerBase {
    public static UpdateReportList(data: ReportTypeModel[]) {
        ReportingStore.UpdateReportyData(data)
    }

    public static UpdateFilterList(data: GetDataResponseModel) {
        ReportingStore.UpdateFilterList(data)
    }
}