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
        if(PageDateTime !== null && PageDateTime !== undefined) {
            getValue += `PageDateTime=${PageDateTime}&`
        }
        getValue.slice(0, -1)
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
        if (ReportId !== null && ReportId !== undefined) {
            valueExport += `ReportId=${ReportId}&`
        }
        if (FromDateTime !== null && FromDateTime !== undefined) {
            valueExport += `FromDateTime=${FromDateTime}&`
        }
        if (ToDateTime !== null && ToDateTime !== undefined) {
            valueExport += `ToDateTime=${ToDateTime}&`
        }
        if (MaxRows !== null && MaxRows !== undefined) {
            valueExport += `MaxRows=${MaxRows}&`
        }
        if (SortColumnIndex !== null && SortColumnIndex !== undefined) {
            valueExport += `SortColumnIndex=${SortColumnIndex}&`
        }
        if (SortColumnAscending !== null && SortColumnAscending !== undefined) {
            valueExport += `SortColumnAscending=${SortColumnAscending}&`
        }
        if (FilterName !== null && FilterName !== undefined) {
            valueExport += `FilterName=${FilterName}&`
        }
        if (FilterValue !== null && FilterValue !== undefined) {
            valueExport += `FilterValue=${FilterValue}&`
        }
        valueExport.slice(0, -1)
        return encodeURI(`${this.server}${this.version}${this.reportController}${exportType}/?${valueExport}`)
    }
}
