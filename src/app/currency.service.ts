import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { Currency } from "./currency";

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {

  private _apiBace = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

  constructor(private http: HttpClient) { }

  getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this._apiBace)
      .pipe(
        tap(_ => console.log('fetched data')),
        catchError(this.handleError<Currency[]>('getCurrencies', []))
      );
  }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}