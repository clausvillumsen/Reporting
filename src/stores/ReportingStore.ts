import { BehaviorSubject, Observable } from "rxjs";
import { ReportTypeModel } from "../models/ReportTypeModel";
import { StoreBase } from "./StoreBase";
import { GetReportReducer } from "../reducers/GetReportReducer";
import ObjectHelper from "../common/ObjectHelper";
import { GetDataResponseModel } from "../models/GetDataResponseModel";
import { GridSchema } from "../models/GridSchema";

export class ReportingStore extends StoreBase<GetReportReducer> {
    // Static data
    private static reportTypeDataSource: ReportTypeModel[] = [];
    private static gridSchema: GridSchema = null;
    private static responseDataSource: GetDataResponseModel = null;
    // Behavior Subject
    private static reportTypeDataSourceSubject: BehaviorSubject<ReportTypeModel[]> = new BehaviorSubject([])
    private static gridDataSourceSubject: BehaviorSubject<GetDataResponseModel> = new BehaviorSubject(null)
    private static gridSchemaBehavior: BehaviorSubject<GridSchema> = new BehaviorSubject(null)
    // Observable
    public static reportTypeDataSourceObservable: Observable<ReportTypeModel[]> = ReportingStore.reportTypeDataSourceSubject.asObservable();
    public static gridDataSourceObservable: Observable<GetDataResponseModel> = ReportingStore.gridDataSourceSubject.asObservable();
    public static gridSchemaObservable: Observable<GridSchema> = ReportingStore.gridSchemaBehavior.asObservable();

    public static UpdateData(data: ReportTypeModel[]) {
        this.reportTypeDataSource = data
        this.reportTypeDataSourceSubject.next(ObjectHelper.DeepCopyRecursive(data))
    }
    public static MergeData(data: ReportTypeModel[]) {
        this.reportTypeDataSource = this.reportTypeDataSource.concat(data)
        this.reportTypeDataSourceSubject.next(ObjectHelper.DeepCopyRecursive(ReportingStore.reportTypeDataSource))
    }

    public static UpdateGridList(data: GetDataResponseModel) {
        this.responseDataSource = data
        this.gridDataSourceSubject.next(ObjectHelper.DeepCopyRecursive(this.responseDataSource));
    }

    public static MergeGridList(data: GetDataResponseModel) {
        this.MergeResourceResponse(data);
        this.gridDataSourceSubject.next(ObjectHelper.DeepCopyRecursive(this.responseDataSource));
    }

    public static UpdateGridSchema(data: GridSchema) {
        this.gridSchema = data
        this.gridSchemaBehavior.next(ObjectHelper.DeepCopyRecursive(ReportingStore.gridSchema))
    }

    public static GetGridSchema(): GridSchema {
        return ObjectHelper.DeepCopyRecursive(ReportingStore.gridSchema)
    }

    public static GetResponseData(): GetDataResponseModel {
        return ObjectHelper.DeepCopyRecursive(this.responseDataSource)
    }

    private static MergeResourceResponse(data: GetDataResponseModel) {
        if (!this.responseDataSource) {
            this.responseDataSource = data;
            return;
        }
        if (data && data.Rows) {
            this.responseDataSource.ExportLinks = data.ExportLinks
            this.responseDataSource.Columns = data.Columns
            this.responseDataSource.PageCount = data.PageCount
            this.responseDataSource.TotalCount = data.TotalCount
            this.responseDataSource.NextPageDatePointer = data.NextPageDatePointer
            this.responseDataSource.Rows = this.responseDataSource.Rows.concat(data.Rows)
        }

    }

    public static GetNextResponsePageDateTime(): string {
        return this.responseDataSource.NextPageDatePointer;
    }
}