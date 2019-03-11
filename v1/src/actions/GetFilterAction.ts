import { ActionBase } from "./ActionBase";
import ApiHelper from "../common/ApiHelper";
import { ReportingConfiguration } from "../environment/ReportingConfiguration";
import { GetReportReducer } from "../reducers/GetReportReducer";

export class GetFilterAction extends ActionBase {
    constructor(readonly reportId: string) {
        super()
    }
    public async Execute() {
        let data = await ApiHelper.simpleGet(ReportingConfiguration.GetFilter(this.reportId))
        var jsonObject = await data.json()
        GetReportReducer.UpdateFilterList(jsonObject);
        return true
    }

    public async onExecuteError() {
        return false
    }


}