export class GetDataResponseModel {
    TotalCount: number
    PageCount: number
    NextPageDatePointer: string
    Columns: ColumnModel[]
    Rows: string[][]
}

export class ColumnModel {
    Name: string
    DataType: ColumnDataType
    Sortable: boolean
    Filter: FilterType
    constructor(name: string, dataType: ColumnDataType, sortable: boolean, filter: FilterType) {
        this.Name = name
        this.DataType = dataType
        this.Sortable = sortable
        this.Filter = filter
    }
}

export enum FilterType {
    dateTimeUTC = "DateTimeUtc",
    cvr = "https://modst.dk/sso/claims/cvr",
    userId = "https://modst.dk/sso/claims/userid",
    surName = "https://modst.dk/sso/claims/surname",
    givenName = "https://modst.dk/sso/claims/givenname",
    email = "https://modst.dk/sso/claims/email",
    unieuqId = "https://modst.dk/sso/claims/uniqueid"
}

export enum ColumnDataType {
    guid = "Guid",
    string =  "String",
    date = "DateTime",
}

