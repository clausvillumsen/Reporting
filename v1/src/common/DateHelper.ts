
export class DateHelper {
    public static GetDateStringFromUTC(dateString: string): string {
        try {
            // fix for IE - doesn't accept the "-" date format
            return new Date(dateString.replace("-", "/")).toLocaleString();
        } catch {
            return "Invalid Date"
        }
    }

    public static GetISOStringWithoutOffset(date: Date): string {
        // return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString()
        return date.toISOString()
    }


}