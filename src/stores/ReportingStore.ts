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
    private static dataSource: ReportTypeModel[] = [];
    private static dataSourceGrid: ReportGridModel = null;
    private static gridSchema: GridSchema = null;
    private static source: BehaviorSubject<ReportTypeModel[]> = new BehaviorSubject([])
    private static sourceGrid: BehaviorSubject<ReportGridModel> = new BehaviorSubject(null)
    private static gridSchemaBehavior: BehaviorSubject<GridSchema> = new BehaviorSubject(null)
    public static SourceObservable: Observable<ReportTypeModel[]> = ReportingStore.source.asObservable();
    public static dataSourceGridObservable: Observable<ReportGridModel> = ReportingStore.sourceGrid.asObservable();
    public static gridSchemaObservable: Observable<GridSchema> = ReportingStore.gridSchemaBehavior.asObservable();

    public static UpdateData(data: ReportTypeModel[]) {
        this.dataSource = data
        this.source.next(ObjectHelper.DeepCopyRecursive(data))
    }
    public static MergeData(data: ReportTypeModel[]) {
        this.dataSource.concat(data)
        this.source.next(ObjectHelper.DeepCopyRecursive(ReportingStore.dataSource))
    }

    public static UpdateGridList(data: GetDataResponseModel) {
        this.dataSourceGrid = new ReportGridModel(data && data.TotalCount ? data.TotalCount : 0,
            data && data.PageCount ? data.PageCount : 0,
            data && data.NextPageDatePointer ? data.NextPageDatePointer : new Date().toUTCString(),
            []
        )
        if (!data) {
            this.sourceGrid.next(ObjectHelper.DeepCopyRecursive(this.dataSourceGrid));
            return;
        }
        let columns = data.Columns
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
        this.dataSourceGrid.Data = newData;
        this.sourceGrid.next(ObjectHelper.DeepCopyRecursive(this.dataSourceGrid));
    }

    public static UpdateGridSchema(data: GridSchema) {
        this.gridSchema = data
        this.source.next(ObjectHelper.DeepCopyRecursive(ReportingStore.gridSchema))
    }

    public static GetGridSchema(): GridSchema {
        return ObjectHelper.DeepCopyRecursive(ReportingStore.gridSchema)
    }
}