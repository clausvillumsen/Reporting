import { ActionBase } from "./ActionBase";
import { SortingRule } from "react-table";
import { GetDataReducer } from "../reducers/GetDataReducer";
import { GridSchema } from "../models/GridSchema";

export class UpdateGridSchemaAction extends ActionBase {
    constructor(readonly reportId?: number,
        readonly fromDateTime?: Date,
        readonly toDateTime?: Date,
        readonly maxRows: number = 100,
        readonly sortColumnIndex: number = 0,
        readonly sortColumnAscending: boolean = true,
        readonly filterName: string = "",
        readonly filterValue: string = "",
        readonly sorted?: SortingRule[],
        readonly page?: number,
        readonly pageSize?: number) {
        super()
    }
    public async Execute() {
        var schema = new GridSchema()
        var oldSchema = GetDataReducer.GetGridSchema()
        if (oldSchema == null || oldSchema == undefined) {
            GetDataReducer.UpdateGridSchema(new GridSchema(this.reportId,
                this.fromDateTime,
                this.toDateTime,
                this.maxRows,
                this.sortColumnIndex,
                this.sortColumnAscending,
                this.filterName,
                this.filterValue,
                this.sorted,
                this.page,
                this.pageSize))
                return true
        }
        // null != undefined --> false
        // null !== undefined --> true
        schema.reportId = this.reportId !== undefined ? this.reportId : oldSchema.reportId
        schema.fromDateTime = this.fromDateTime !== undefined ? this.fromDateTime : oldSchema.fromDateTime
        schema.toDateTime = this.toDateTime !== undefined ? this.toDateTime : oldSchema.toDateTime
        schema.maxRows = this.maxRows !== undefined ? this.maxRows : oldSchema.maxRows
        schema.sortColumnIndex = this.sortColumnIndex !== undefined ? this.sortColumnIndex : oldSchema.sortColumnIndex
        schema.sortColumnAscending = this.sortColumnAscending !== undefined ? this.sortColumnAscending : oldSchema.sortColumnAscending
        schema.filterName = this.filterName !== undefined ? this.filterName : oldSchema.filterName
        schema.filterValue = this.filterValue !== undefined ? this.filterValue : oldSchema.filterValue
        schema.sorted = this.sorted !== undefined ? this.sorted : oldSchema.sorted
        schema.page = this.page !== undefined ? this.page : oldSchema.page
        schema.pageSize = this.pageSize !== undefined ? this.pageSize : oldSchema.pageSize
        
        GetDataReducer.UpdateGridSchema(schema)
        return true
    }

    public async onExecuteError() {
        return false
    }


}