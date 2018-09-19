import { ExportTypeEnum } from "../common/constants/exportType";
import { DateHelper } from '../common/DateHelper'
import { DataHelper } from "../common/DataHelper";
export class ReportingConfiguration {
    static exportCSV: string = "csv/"
    static exportXML: string = "xml/"
    static exportJSON: string = "json/"
    static getEndPoint = (): string => {
        return (window as any)['endpoint'];
    }
    static GetReports(): string {
        return `${ReportingConfiguration.getEndPoint()}/GetReports`
    }
    static GetFilter(reportId: string) {
        let getValue: string = ''
        if (reportId !== null && reportId !== undefined) {
            getValue += `ReportId=${reportId}&MaxRows=1`
        }
        return encodeURI(`${ReportingConfiguration.getEndPoint()}/GetData?${getValue}`)
    }
    static GetData(ReportId?: number,
        FromDateTime?: Date,
        ToDateTime?: Date,
        MaxRows?: number,
        SortColumnIndex?: number,
        SortColumnAscending?: boolean,
        FilterName?: string,
        FilterValue?: string,
        PageDateTime?: string
    ): string {
        let getValue: string = ''
        if (ReportId !== null && ReportId !== undefined) {
            getValue += `ReportId=${ReportId}&`
        }
        if (FromDateTime !== null && FromDateTime !== undefined) {
            getValue += `FromDateTime=${DateHelper.GetISOStringWithoutOffset(FromDateTime)}&`
        }
        if (ToDateTime !== null && ToDateTime !== undefined) {
            getValue += `ToDateTime=${DateHelper.GetISOStringWithoutOffset(ToDateTime)}&`
        }
        if (MaxRows !== null && MaxRows !== undefined) {
            getValue += `MaxRows=${MaxRows}&`
        }
        if (SortColumnIndex !== null && SortColumnIndex !== undefined) {
            getValue += `SortColumnIndex=${SortColumnIndex}&`
        }
        if (SortColumnAscending !== null && SortColumnAscending !== undefined) {
            getValue += `SortColumnAscending=${SortColumnAscending}&`
        }
        if (FilterName !== null && FilterName !== undefined) {
            getValue += `FilterName=${FilterName}&`
        }
        if (FilterValue !== null && FilterValue !== undefined) {
            getValue += `FilterValue=${FilterValue}&`
        }
        if (PageDateTime !== null && PageDateTime !== undefined) {
            getValue += `PageDateTime=${PageDateTime}&`
        }
        getValue = getValue.slice(0, -1)
        return encodeURI(`${ReportingConfiguration.getEndPoint()}/GetData?${getValue}`)
    }

    static Export(exportType: ExportTypeEnum,
        ReportId?: number,
        FromDateTime?: Date,
        ToDateTime?: Date,
        MaxRows?: number,
        SortColumnIndex?: number,
        SortColumnAscending?: boolean,
        FilterName?: string,
        FilterValue?: string

    ): string {

        let valueExport: string = ''
        valueExport += `ReportId=${ReportId ? ReportId : ''}&`
        valueExport += `FromDateTime=${FromDateTime ? DateHelper.GetISOStringWithoutOffset(FromDateTime) : ''}&`
        valueExport += `ToDateTime=${ToDateTime ? DateHelper.GetISOStringWithoutOffset(ToDateTime) : ''}&`
        valueExport += `SortColumnIndex=${SortColumnIndex ? SortColumnIndex : ''}&`
        valueExport += `SortColumnAscending=${SortColumnAscending ? SortColumnAscending : true}&`
        valueExport += `FilterName=${FilterName ? FilterName : ''}&`
        valueExport += `FilterValue=${FilterValue ? FilterValue : ''}&`
        valueExport += `MaxRows=${MaxRows ? MaxRows : 100}&`
        valueExport = valueExport.slice(0, -1)
        return encodeURI(`${ReportingConfiguration.getEndPoint()}/${exportType}/?${valueExport}`)
    }
}
