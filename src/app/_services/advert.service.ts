import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Item } from '../_models/item'

@Injectable({
  providedIn: 'root'
})
export class AdvertService {

  private itemsUrl = "api/items";

  constructor(private http: HttpClient) { }

  /** 
   * return all advert 
   */
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl);
  }

  /** 
   * get item or advert by id 
   */
  getItem(userId: number): Observable<Item[]> {
    if (userId === 0) {
      of(this.initializeItem());
    }
    const url = `${this.itemsUrl}/?userId=${userId}`;
    return this.http.get<Item[]>(url)
      .pipe(
        tap(_ =>
          catchError(this.handleError)//<Item[]>(`getItem userId=${userId}`))
        ));
  }

  /** 
   * get item by id and return one value 
   */
  getOneItem(id: number): Observable<Item> {
    if (id === 0) {
      return of(this.initializeItem());
    }
    const url = `${this.itemsUrl}/${id}`;
    return this.http.get<Item>(url)
      .pipe(
        //tap(data => console.log('getOneItem: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  /** 
   * create new advert 
   */
  addAdvert(item: Item): Observable<Item> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    item.id = null;
    return this.http.post<Item>(this.itemsUrl, item, { headers })
      .pipe(
        tap(data => console.log('addAdvert: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  /** 
   * update advert 
   */
  updateAdvert(item: Item): Observable<Item> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.itemsUrl}/${item.id}`;
    return this.http.put<Item>(url, item, { headers }).pipe(
      //return item and update
      map(() => item,
        catchError(this.handleError))
    );
  }

  /** 
   * remove item from the list 
   */
  deleteAdvert(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.itemsUrl}/${id}`;
    return this.http.delete<Item>(url, { headers });
  }

  //catch error 
  private handleError(err): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }


  private initializeItem(): Item {
    // Return an initialized object
    return {
      id: 0,
      itemHeader: null,
      releaseDate: null,
      price: null,
      description: null,
      userId: 0,
      imageUrl: null
    };
  }

}
