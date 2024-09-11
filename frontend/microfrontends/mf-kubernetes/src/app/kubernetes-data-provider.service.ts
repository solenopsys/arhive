import {Injectable} from '@angular/core';
import {DataListInterface, DataPageConfig} from "@solenopsys/fl-dgraph";
import {firstValueFrom, tap} from "rxjs";
import {map} from "rxjs/operators";
import {KubernetesService} from "./kubernetes.service";
import {DataPageConfigTransform} from "./tables.config";

@Injectable({
  providedIn: 'root'
})
export class KubernetesDataProvider implements DataListInterface {

  constructor(private kubService: KubernetesService) {
  }

  getMax(): number {
    return 0;
  }

  next(start: number, count: number, conf: DataPageConfigTransform): Promise<any> {
    const f =(group: any[]) => group.slice(start, start + count);
    return firstValueFrom(this.kubService.getRequestConf(conf.listQ, conf.map).pipe(map(f)));
  }
}
