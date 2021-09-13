import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  getStoreById(storeId: any): Observable<any> {
    return this.http.get(`${baseUrl}/api/store/fetchStoreById/${storeId}`);
  }

  fetchAllStoresByClientFK(client_fk: any): Observable<any> {
    return this.http.get(`${baseUrl}/api/store/fetchAllStoresByClientFK/${client_fk}`);
  }

  deleteStoreById(storeId: any): Observable<any> {
    return this.http.delete(`${baseUrl}/api/store/${storeId}`);
  }

  createStore(store: any): Observable<any> {
    return this.http.post(baseUrl + '/api/store/createStore', store);
  }

  updateStore(storeId: any, store: any): Observable<any> {
    return this.http.put(baseUrl + '/api/store/updateById/' + `${storeId}`, store);
  }

  getLocation() : Observable<any> {
    return this.http.get(`${baseUrl}/api/store/locations`);
  }





}
