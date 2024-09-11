import {Injectable} from '@angular/core';
import {DataListInterface, DataPageConfig} from "@solenopsys/fl-dgraph";
import {firstValueFrom, tap} from "rxjs";
import {map} from "rxjs/operators";
import {ClickhouseService} from "./clickhouse.service";

@Injectable({
  providedIn: 'root'
})
export class ClickhouseDataProvider implements DataListInterface {

  constructor(private postgresqlService: ClickhouseService) { }


  getMax() {
    return 0;
  }

  next(start: number, count: number, conf: DataPageConfig): Promise<any> {
    let observable = this.postgresqlService.list(conf.listQ).pipe(map((data:string[])=>data?.slice(start, start + count)));
    return firstValueFrom(observable.pipe(tap(k=>console.log("PIPE DATA",k))));
  }


}


