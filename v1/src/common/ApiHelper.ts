import "isomorphic-fetch";

export default class ApiHelper {
  private static requestHeaders: any = {
    "Content-Type": "application/json",
    mode: "no-cors"
  };
  public static simpleGet(url: string): Promise<any> {
    require("es6-promise").polyfill();
    require("isomorphic-fetch");
    return fetch(url);
  }
  public static get(url: string): Promise<any> {
    require("es6-promise").polyfill();
    require("isomorphic-fetch");
    return fetch(url, {
      method: "GET"
    });
  }

  public static downloadFile(url: string) {
    window.open(url);
  }
  public static post(url: string, requestBody: any): Promise<any> {
    require("es6-promise").polyfill();
    require("isomorphic-fetch");
    return fetch(url, {
      method: "POST",
      headers: ApiHelper.requestHeaders,
      body: requestBody
    });
  }
}
