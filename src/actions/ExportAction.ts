import { ActionBase } from "./ActionBase";
import { ExportModel } from "../models/ExportModel";
import { DataHelper } from "../common/DataHelper";
import { GetDataReducer } from "../reducers/GetDataReducer";

export class ExportAction extends ActionBase {
    constructor(readonly exportType: ExportModel) {
        super()
    }

    public async Execute() {
        var responseData = GetDataReducer.GetResponseData()
        if(!responseData || !responseData.Columns || responseData.Columns == [] || !responseData.Rows || responseData.Rows == []) {
            return false;
        }
        DataHelper.ExportData(responseData, this.exportType)
        return true
    }

    public async onExecuteError() {
        return false
    }


}