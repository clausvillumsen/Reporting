import { ExportTypeEnum } from "../common/constants/exportType";

export class ReportingConfiguration {
    static server: string = "http://reporting.kundedemo.dk/api/"
    static version: string = "v1/"
    static reportController: string = "Reporting/"
    static exportCSV: string = "csv/"
    static exportXML: string = "xml/"
    static exportJSON: string = "json/"

    static GetReports(): string {
        return `${this.server}${this.version}${this.reportController}GetReports`
    }
    static GetFilter(reportId: string) {
        let getValue: string = ''
        if (reportId !== null && reportId !== undefined) {
            getValue += `ReportId=${reportId}&MaxRows=1`
        }
        return encodeURI(`${this.server}${this.version}${this.reportController}GetData?${getValue}`)
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
            getValue += `FromDateTime=${FromDateTime}&`
        }
        if (ToDateTime !== null && ToDateTime !== undefined) {
            getValue += `ToDateTime=${ToDateTime}&`
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
        return encodeURI(`${this.server}${this.version}${this.reportController}GetData?${getValue}`)
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
        valueExport += `FromDateTime=${FromDateTime ? FromDateTime : ''}&`
        valueExport += `ToDateTime=${ToDateTime ? ToDateTime : ''}&`
        valueExport += `SortColumnIndex=${SortColumnIndex ? SortColumnIndex : ''}&`
        valueExport += `SortColumnAscending=${SortColumnAscending ? SortColumnAscending : true}&`
        valueExport += `FilterName=${FilterName ? FilterName : ''}&`
        valueExport += `FilterValue=${FilterValue ? FilterValue : ''}&`
        valueExport += `MaxRows=${MaxRows ? MaxRows : 100}&`
        valueExport = valueExport.slice(0, -1)
        return encodeURI(`${this.server}${this.version}${this.reportController}${exportType}/?${valueExport}`)
    }
}
