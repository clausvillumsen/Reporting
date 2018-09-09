import { ActionBase } from "./ActionBase";
import ApiHelper from "../common/ApiHelper";
import { ReportingConfiguration } from "../environment/ReportingConfiguration";
import { GetDataReducer } from "../reducers/GetDataReducer";
import { GridSchema } from "../models/GridSchema";

export class GetMoreDataAction extends ActionBase {
    constructor(dateTimeUTC: string) {
        super()
    }
    public async Execute() {
        let schema: GridSchema = GetDataReducer.GetGridSchema();
        let data = await ApiHelper.simpleGet(ReportingConfiguration.GetData(schema.reportId,
            schema.fromDateTime,
            schema.toDateTime,
            schema.maxRows,
            schema.sortColumnIndex,
            schema.sortColumnAscending,
            schema.filterName,
            schema.filterValue))
        var jsonObject = await data.json()
        GetDataReducer.MergeGridList(jsonObject);
        return true
    }

    public async onExecuteError() {
        return false
    }


}