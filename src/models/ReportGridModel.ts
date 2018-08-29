
export class ReportGridModel {
    TotalCount: number
    PageCount: number
    NextPageDatePointer: string
    Data: GridRowModel[]
    constructor(TotalCount: number,
        PageCount: number,
        NextPageDatePointer: string,
        Data: GridRowModel[]) {
            this.TotalCount = TotalCount
            this.PageCount = PageCount
            this.NextPageDatePointer = NextPageDatePointer
            this.Data = Data
        }
}

export class GridRowModel {
    Tidspunkt: string
    CVRNummer: string
    BrugerID: string
    Efternavn: string
    Fornavn: string
    Emailadresse: string
    UniktID: string
}