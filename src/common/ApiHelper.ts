export default class ApiHelper {
    public static simpleGet(url: string): Promise<any> {
        return fetch(url);
    }
    public static get(url: string): Promise<any> {
        return fetch(url, {
            method: 'GET',
        });
    }

    public static downloadFile(url: string) {
        window.open(url)
    }
    public static post(url: string, requestBody: any): Promise<any> {
        return fetch(url, {
            method: 'POST',
            headers: ApiHelper.requestHeaders,
            body: requestBody
        });
    }
}