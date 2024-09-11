import { Injectable } from "@angular/core";
import { DataListInterface, DataPageConfig } from "@solenopsys/fl-dgraph";

import { firstValueFrom, tap } from "rxjs";
import { map } from "rxjs/operators";
import { RegistryService } from "./registry.service";

@Injectable({
  providedIn: 'root'
})
export class RegistryDataProvider implements DataListInterface {

  constructor(private registryService: RegistryService ) { }

  getMax() {
    return 0;
  }

  next(start: number, count: number, conf: DataPageConfig): Promise<any> {
    let observable = this.registryService.list(conf.listQ).pipe(map((data:string[])=>data?.slice(start, start + count)));
    return firstValueFrom(observable.pipe(tap(k=>console.log("PIPE DATA",k))));
  }
}



