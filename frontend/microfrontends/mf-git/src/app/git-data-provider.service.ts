import {Injectable} from '@angular/core';
import {DataItemInterface, DataListInterface, DataPageConfig} from "@solenopsys/fl-dgraph";

import {firstValueFrom, Observable, tap} from "rxjs";
import {map} from "rxjs/operators";
import {GitService} from "./git.service";

@Injectable({
  providedIn: 'root'
})
export class GitDataProvider implements DataListInterface,DataItemInterface {

  constructor(private gitService: GitService) { }


  getMax() {
    return 0;
  }

  next(start: number, count: number, conf: DataPageConfig): Promise<any> {
    let observable = this.gitService.list(conf.listQ).pipe(map((data:string[])=>data?.slice(start, start + count)));
    return firstValueFrom(observable.pipe(tap(k=>console.log("PIPE DATA",k))));
  }

  loadOne(key: string, conf: DataPageConfig): Promise<any> {
    return Promise.resolve({name:""});
  }

  save(key: string, nowObjectState: any, beforeObjectState: any, conf: DataPageConfig): Observable<any> {
    let name = nowObjectState.name;
    return this.gitService.createRepo(name);
  }
}



