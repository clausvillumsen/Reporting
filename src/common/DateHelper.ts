
export class DateHelper {
    public static GetDateStringFromUTC(dateString: string): string {
        try {
            return new Date(dateString).toDateString();
        } catch {
            return "Invalid Date"
        }
    }


   
}