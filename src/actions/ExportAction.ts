import { ActionBase } from "./ActionBase";
import { GetDataReducer } from "../reducers/GetDataReducer";
import { ExportTypeEnum } from "../common/constants/exportType";
import { GridSchema } from "../models/GridSchema";
import { ReportingConfiguration } from "../environment/ReportingConfiguration";
import ApiHelper from "../common/ApiHelper";

export class ExportAction extends ActionBase {
    constructor(readonly exportType: ExportTypeEnum) {
        super()
    }

    public async Execute() {
        let schema: GridSchema = GetDataReducer.GetGridSchema();
        let gridRowsData = GetDataReducer.GetResponseData()
        let maxRows = gridRowsData && gridRowsData.Rows && gridRowsData.Rows.length || 100
        await ApiHelper.simpleGet(ReportingConfiguration.Export(this.exportType,
            schema.reportId,
            schema.fromDateTime,
            schema.toDateTime,
            maxRows,
            schema.sortColumnIndex,
            schema.sortColumnAscending,
            schema.filterName,
            schema.filterValue))
        return true
    }

    public async onExecuteError() {
        return false
    }


}