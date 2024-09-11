import {Injectable} from '@angular/core';
import {DataListInterface, DataPageConfig} from "@solenopsys/fl-dgraph";
import {firstValueFrom, tap} from "rxjs";
import {PostgresqlService} from "./postgresql.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PostgresqlDataProvider implements DataListInterface {

  constructor(private postgresqlService: PostgresqlService) { }


  getMax() {
    return 0;
  }

  next(start: number, count: number, conf: DataPageConfig): Promise<any> {
    let observable = this.postgresqlService.list(conf.listQ).pipe(map((data:string[])=>data?.slice(start, start + count)));
    return firstValueFrom(observable.pipe(tap(k=>console.log("PIPE DATA",k))));
  }


}


