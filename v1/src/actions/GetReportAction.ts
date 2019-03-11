import { ActionBase } from "./ActionBase";
import ApiHelper from "../common/ApiHelper";
import { ReportingConfiguration } from "../environment/ReportingConfiguration";
import { GetReportReducer } from "../reducers/GetReportReducer";

export class GetReportAction extends ActionBase {
 
    public async Execute() {
        let data = await ApiHelper.simpleGet(ReportingConfiguration.GetReports())
        var jsonObject = await data.json()
        GetReportReducer.UpdateReportList(jsonObject);
        return true
    }

    public async onExecuteError() {
        return false
    }


}