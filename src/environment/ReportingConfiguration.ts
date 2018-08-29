export class ReportingConfiguration {
    static server: string = "http://reporting.kundedemo.dk/api/"
    static version: string = "v1/"
    static reportController: string = "Reporting/"

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
        FilterValue?: string

    ): string {

        let getValue: string = ''
        if (ReportId != null && ReportId != undefined) {
            getValue += `ReportId=${ReportId}&`
        }
        if (FromDateTime != null && FromDateTime != undefined) {
            getValue += `FromDateTime=${FromDateTime}&`
        }
        if (ToDateTime != null && ToDateTime != undefined) {
            getValue += `ToDateTime=${ToDateTime}&`
        }
        if (MaxRows != null && MaxRows != undefined) {
            getValue += `MaxRows=${MaxRows}&`
        }
        if (SortColumnIndex != null && SortColumnIndex != undefined) {
            getValue += `SortColumnIndex=${SortColumnIndex}&`
        }
        if (SortColumnAscending != null && SortColumnAscending != undefined) {
            getValue += `SortColumnAscending=${SortColumnAscending}&`
        }
        if (FilterName != null && FilterName != undefined) {
            getValue += `FilterName=${FilterName}&`
        }
        if (FilterValue != null && FilterValue != undefined) {
            getValue += `FilterValue=${FilterValue}&`
        }
        getValue.slice(0, -1)
        return encodeURI(`${this.server}${this.version}${this.reportController}GetData?${getValue}`)
    }
}
