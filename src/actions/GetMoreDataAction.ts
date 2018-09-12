import { ActionBase } from "./ActionBase";
import ApiHelper from "../common/ApiHelper";
import { ReportingConfiguration } from "../environment/ReportingConfiguration";
import { GetDataReducer } from "../reducers/GetDataReducer";
import { GridSchema } from "../models/GridSchema";

export class GetMoreDataAction extends ActionBase {
    constructor() {
        super()
    }
    public async Execute() {
        let schema: GridSchema = GetDataReducer.GetGridSchema();
        let lastDateTime: string = GetDataReducer.GetNextPagePointer();
        let data = await ApiHelper.simpleGet(ReportingConfiguration.GetData(schema.reportId,
            schema.fromDateTime,
            schema.toDateTime,
            100,
            schema.sortColumnIndex,
            schema.sortColumnAscending,
            schema.filterName,
            schema.filterValue,
            lastDateTime))
        var jsonObject = await data.json()
        GetDataReducer.MergeGridList(jsonObject);
        return true
    }

    public async onExecuteError() {
        return false
    }


}