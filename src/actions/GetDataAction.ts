import { ActionBase } from "./ActionBase";
import ApiHelper from "../common/ApiHelper";
import { ReportingConfiguration } from "../environment/ReportingConfiguration";
import { GetReportReducer } from "../reducers/GetReportReducer";
import { GetDataReducer } from "../reducers/GetDataReducer";

export class GetDataAction extends ActionBase {
    constructor(readonly ReportId?: number,
        readonly FromDateTime?: Date,
        readonly ToDateTime?: Date,
        readonly MaxRows?: number,
        readonly SortColumnIndex?: number,
        readonly SortColumnAscending?: boolean,
        readonly FilterName?: string,
        readonly FilterValue?: string) {
        super()

    }
    public async Execute() {
        let data = await ApiHelper.simpleGet(ReportingConfiguration.GetData(this.ReportId,
            this.FromDateTime,
            this.ToDateTime,
            this.MaxRows,
            this.SortColumnIndex,
            this.SortColumnAscending,
            this.FilterName,
            this.FilterValue))
        var jsonObject = await data.json()
        GetDataReducer.UpdateGridList(jsonObject);
        return true
    }

    public async onExecuteError() {
        return false
    }


}