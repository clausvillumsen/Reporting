import { ReportGridModel } from "../models/ReportGridModel";
import { ExportModel } from "../models/ExportModel";
import { GetDataResponseModel } from "../models/GetDataResponseModel";

export class DateHelper {
    public static GetDateStringFromUTC(dateString: string): string {
        try {
            return new Date(dateString).toDateString();
        } catch {
            return "Invalid Date"
        }
    }


   
}