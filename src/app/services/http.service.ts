import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  
  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) {  
  }

  private buildUrl(params: Partial<RequestParameters>, id?: string): string {
    const base = params.baseUrl || this.baseUrl;
    const controllerPath = params.controller ? `/${params.controller}` : '';
    const actionPath = params.action ? `/${params.action}` : '';
    const idPath = id ? `/${id}` : '';
    const queryPath = params.queryString ? `?${params.queryString}` : '';

    return params.fullEndPoint || `${base}${controllerPath}${actionPath}${idPath}${queryPath}`;
  }

  get<T>(params: Partial<RequestParameters>, id?: string): Observable<T> {
    const url = this.buildUrl(params, id);
    return this.httpClient.get<T>(url, { headers: params.headers });
  }

  post<T>(params: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    const url = this.buildUrl(params);
    return this.httpClient.post<T>(url, body, { headers: params.headers });
  }

  put<T>(params: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    const url = this.buildUrl(params);
    return this.httpClient.put<T>(url, body, { headers: params.headers });
  }

  delete<T>(params: Partial<RequestParameters>, id: string): Observable<T> {
    const url = this.buildUrl(params, id);
    return this.httpClient.delete<T>(url, { headers: params.headers });
  }
}

export class RequestParameters {
  controller?: string; // API controller adı (örneğin: "users")
  action?: string; // Ek endpoint parçası (örneğin: "details")
  queryString?: string; // Query string (örneğin: "page=1&size=10")
  headers?: HttpHeaders; // Özel HTTP başlıkları
  baseUrl?: string; // Özel temel URL (varsayılan baseUrl üzerine yazılır)
  fullEndPoint?: string; // Tam URL, diğer parametrelerin yerini alır
}
