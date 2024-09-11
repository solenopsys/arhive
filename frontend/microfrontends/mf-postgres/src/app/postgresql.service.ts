import {Injectable} from '@angular/core';
import {map, Observable, tap} from "rxjs";
import {HStreamService} from "@solenopsys/fl-hyperstreams";

const decode=(val)=> JSON.parse( new TextDecoder().decode(val))

@Injectable({
  providedIn: 'root'
})
export class PostgresqlService {

  constructor(private hs: HStreamService) { }

  list(query:string): Observable<any> {
    return this.hs.createStringQuery("hsm-postgres", query, 2).pipe(map(decode)).pipe(tap(k=>console.log("PIPE DATA1",k)))
  }
}
