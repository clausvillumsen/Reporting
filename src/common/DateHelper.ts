
export class DateHelper {
    public static GetDateStringFromUTC(dateString: string): string {
        try {
            return new Date(dateString).toDateString();
        } catch {
            return "Invalid Date"
        }
    }

    public static GetISOStringWithoutOffset(date: Date): string {
        return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString()
    }

   
}