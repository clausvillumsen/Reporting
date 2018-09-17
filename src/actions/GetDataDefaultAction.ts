import { ActionBase } from "./ActionBase";
import ApiHelper from "../common/ApiHelper";
import { ReportingConfiguration } from "../environment/ReportingConfiguration";
import { GetDataReducer } from "../reducers/GetDataReducer";

export class GetDataDefaultAction extends ActionBase {
    constructor() {
        super()
    }
    public async Execute() {
        let fromDate = new Date();
        let toDate = new Date();
        toDate.setDate(fromDate.getDate() - 1);
        let data = await ApiHelper.simpleGet(ReportingConfiguration.GetData(1,
            fromDate,
            toDate,
            100,
            undefined,
            undefined,
            undefined,
            undefined))
        var jsonObject = await data.json()
        GetDataReducer.UpdateGridList(jsonObject);
        return true
    }

    public async onExecuteError() {
        return false
    }


}