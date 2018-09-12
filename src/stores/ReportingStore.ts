import { BehaviorSubject, Observable } from "rxjs";
import { ReportTypeModel } from "../models/ReportTypeModel";
import { StoreBase } from "./StoreBase";
import { GetReportReducer } from "../reducers/GetReportReducer";
import ObjectHelper from "../common/ObjectHelper";
import { GetDataResponseModel } from "../models/GetDataResponseModel";
import { ReportGridModel, GridRowModel } from "../models/ReportGridModel";
import { DateHelper } from "../common/DateHelper";
import { GridSchema } from "../models/GridSchema";

export class ReportingStore extends StoreBase<GetReportReducer> {
    private static dataSourceReportType: ReportTypeModel[] = [];
    private static dataSourceGrid: ReportGridModel = null;
    private static gridSchema: GridSchema = null;
    private static dataSourceResponseData: GetDataResponseModel = null;
    private static sourceReportType: BehaviorSubject<ReportTypeModel[]> = new BehaviorSubject([])
    private static sourceDataGrid: BehaviorSubject<ReportGridModel> = new BehaviorSubject(null)
    private static gridSchemaBehavior: BehaviorSubject<GridSchema> = new BehaviorSubject(null)
    public static sourceReportTypeObservable: Observable<ReportTypeModel[]> = ReportingStore.sourceReportType.asObservable();
    public static dataSourceGridObservable: Observable<ReportGridModel> = ReportingStore.sourceDataGrid.asObservable();
    public static gridSchemaObservable: Observable<GridSchema> = ReportingStore.gridSchemaBehavior.asObservable();

    public static UpdateData(data: ReportTypeModel[]) {
        this.dataSourceReportType = data
        this.sourceReportType.next(ObjectHelper.DeepCopyRecursive(data))
    }
    public static MergeData(data: ReportTypeModel[]) {
        this.dataSourceReportType = this.dataSourceReportType.concat(data)
        this.sourceReportType.next(ObjectHelper.DeepCopyRecursive(ReportingStore.dataSourceReportType))
    }

    public static UpdateGridList(data: GetDataResponseModel) {
        this.dataSourceResponseData = data;
        this.dataSourceGrid = new ReportGridModel(data && data.TotalCount ? data.TotalCount : 0,
            data && data.PageCount ? data.PageCount : 0,
            data && data.NextPageDatePointer ? data.NextPageDatePointer : new Date().toUTCString(),
            []
        )
        if (!data) {
            this.sourceDataGrid.next(ObjectHelper.DeepCopyRecursive(this.dataSourceGrid));
            return;
        }
        this.dataSourceGrid.Data = this.ProcessGetDataResponseModel(data);
        this.sourceDataGrid.next(ObjectHelper.DeepCopyRecursive(this.dataSourceGrid));
    }

    public static MergeGridList(data: GetDataResponseModel) {
        this.MergeResourceResponse(data);
        if (!this.dataSourceGrid) {
            this.UpdateGridList(data)
            return;
        }
        this.dataSourceGrid.PageCount = data.PageCount
        this.dataSourceGrid.TotalCount = data.TotalCount
        this.dataSourceGrid.NextPageDatePointer = data.NextPageDatePointer
        let newData = this.ProcessGetDataResponseModel(data)
        this.dataSourceGrid.Data = this.dataSourceGrid.Data.concat(newData);
        console.info(this.dataSourceGrid.Data)
        this.sourceDataGrid.next(ObjectHelper.DeepCopyRecursive(this.dataSourceGrid));
    }

    public static UpdateGridSchema(data: GridSchema) {
        this.gridSchema = data
        this.gridSchemaBehavior.next(ObjectHelper.DeepCopyRecursive(ReportingStore.gridSchema))
    }

    public static GetGridSchema(): GridSchema {
        return ObjectHelper.DeepCopyRecursive(ReportingStore.gridSchema)
    }


    public static GetResponseData(): GetDataResponseModel {
        return ObjectHelper.DeepCopyRecursive(this.dataSourceResponseData)
    }

    private static MergeResourceResponse(data: GetDataResponseModel) {
        if (!this.dataSourceResponseData) {
            this.dataSourceResponseData = data;
            return;
        }
        if (data && data.Rows) {
            this.dataSourceResponseData.Columns = data.Columns
            this.dataSourceResponseData.PageCount = data.PageCount
            this.dataSourceResponseData.TotalCount = data.TotalCount
            this.dataSourceResponseData.NextPageDatePointer = data.NextPageDatePointer
            this.dataSourceResponseData.Rows = this.dataSourceResponseData.Rows.concat(data.Rows)
        }

    }

    private static ProcessGetDataResponseModel(data: GetDataResponseModel): GridRowModel[] {
        let columns = data.Columns
        if (!data.Rows) { return [] }
        let newData = data.Rows.map((row) => {
            let item = new GridRowModel()
            for (var i = 0; i < row.length; i++) {
                var columnName = columns[i].Name.replace(/\W/, '')
                switch (columnName) {
                    case "Tidspunkt": {
                        item.Tidspunkt = DateHelper.GetDateStringFromUTC(row[i])
                        break;
                    }
                    case "CVRNummer": {
                        item.CVRNummer = row[i]
                        break;
                    }
                    case "BrugerID": {
                        item.BrugerID = row[i]
                        break;
                    }
                    case "Fornavn": {
                        item.Fornavn = row[i]
                        break;
                    }
                    case "Efternavn": {
                        item.Efternavn = row[i]
                        break;
                    }
                    case "Emailadresse": {
                        item.Emailadresse = row[i]
                        break;
                    }
                    case "UniktID": {
                        item.UniktID = row[i]
                        break;
                    }
                }

            }
            return item
        })
        return newData;
    }

    public static GetNextResponsePageDateTime(): string {
        return this.dataSourceResponseData.NextPageDatePointer;
    }
}