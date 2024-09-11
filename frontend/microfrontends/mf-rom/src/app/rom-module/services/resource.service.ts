import {Injectable} from '@angular/core';
import {convertGoalItems} from './plan-ui.service';
import {DgraphService} from "@solenopsys/fl-dgraph";
import {ResourceData} from "@solenopsys/ui-controls";
import {firstValueFrom} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private dgraph: DgraphService) {
  }

  loadResources(): Promise<ResourceData[]> {
    return firstValueFrom(
      this.dgraph.query('{ ' +
        ' goalLinks(func: has(resources) ){uid  resources {uid rom.resource}}' +
        ' items(func: has(rom.resource) ){uid rom.resource} ' +
        '}').pipe(map((res: { goalLinks: any[], items: [] }) =>
        convertGoalItems('resources', 'rom.resource', res)
      )));
  }

  linkResource(goalId: string, itemId: string) {
    return firstValueFrom(
      this.dgraph.mutate('{ set {\n' +
        `<${goalId}> <resources> <${itemId}> .\n` +
        ' }  }').pipe(map((res: any) => res.uids.item
      )))
  }

  saveResource(name: string, goalId: string) {
    return firstValueFrom(
      this.dgraph.mutate('{ set {\n' +
        `_:item <rom.resource> "${name}" .\n` +
        `<${goalId}> <resources> _:item .\n` +
        ' }  }').pipe(map(((res: any) => res.uids.item))));
  }

  unlinkResource(goalId: string, itemId: string) {
    return firstValueFrom(
      this.dgraph.mutate('{ delete {\n' +
        `<${goalId}> <resources> <${itemId}> .\n` +
        ' }  }').pipe(map(((res: any) => res.uids.item))));
  }
}
