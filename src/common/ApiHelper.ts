export default class ApiHelper {
    private static requestHeaders: any = { 'Content-Type': 'application/json' };
    public static simpleGet(url: string): Promise<any> {
        return fetch(url);
    }
    public static get(url: string): Promise<any> {
        return fetch(url, {
            method: 'GET',
            headers: ApiHelper.requestHeaders,
        });
    }
    public static post(url: string, requestBody: any): Promise<any> {
        return fetch(url, {
            method: 'POST',
            headers: ApiHelper.requestHeaders,
            body: requestBody
        });
    }
}