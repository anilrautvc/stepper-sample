import { Injectable } from '@angular/core';
import { Identity } from './identity.model';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface DatagridResult {
  data: Identity [];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  loading: boolean = false;

  lastRequest: any = {};

  protected BASE_URL: string = 'api/identities';
  // tslint:disable-next-line: variable-name
  protected _dataResult: BehaviorSubject<DatagridResult> = new BehaviorSubject({data: [], total: 0});

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  get identities() { return this._dataResult.asObservable(); }
  get identitiesValue() { return this._dataResult.getValue(); }

  public query(): void {
    //this.lastRequest = request;
    this.loading = true;  // to show spinner or not
    this.fetch().pipe(
      map(result => ({data: result, total: result.length})),
      tap(() => this.loading = false)
    ).subscribe(x => this._dataResult.next(x));
  }

  public fetch(): Observable<any> {
    return this.http.get(`${this.BASE_URL}`);
  }

  fetchIdentities() {
    return this.http.get(this.BASE_URL);
  }
}
