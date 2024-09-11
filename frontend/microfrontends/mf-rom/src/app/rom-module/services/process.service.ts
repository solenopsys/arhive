import {Injectable} from '@angular/core';
import {convertGoalItems} from './plan-ui.service';
import {DgraphService} from "@solenopsys/fl-dgraph";
import {ProcessData} from "@solenopsys/ui-controls";
import {map} from "rxjs/operators";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  constructor(private dgraph: DgraphService) {
  }

  loadProcesses(): Promise<ProcessData[]> {
    return firstValueFrom(
      this.dgraph.query('{ ' +
        ' goalLinks(func: has(processes) ){uid  processes {uid rom.process}}' +
        ' items(func: has(rom.process) ){uid rom.process} ' +
        '}').pipe(map((res: { goalLinks: any[], items: [] }) =>
          convertGoalItems('processes', 'rom.process', res))
      )
   );
  }

  linkProcess(goalId: string, itemId: string): Promise<any> {
    return firstValueFrom(
      this.dgraph.mutate('{ set {\n' +
        `<${goalId}> <processes> <${itemId}> .\n` +
        ' }  }').pipe(map((res: any) => res.uids.item))
    );
  }

  saveProcess(name: string, goalId: string): Promise<any> {
    return firstValueFrom(
      this.dgraph.mutate('{ set {\n' +
        `_:item <rom.process> "${name}" .\n` +
        `<${goalId}> <processes> _:item .\n` +
        ' }  }').pipe(map((res: any) => res.uids.item))
    );
  }

  unlinkProcess(goalId: string, itemId: string): Promise<any> {
    return firstValueFrom(
      this.dgraph.mutate('{ delete {\n' +
        `<${goalId}> <processes> <${itemId}> .\n` +
        ' }  }').pipe(map((res: any) => res.uids.item))
    );
  }
}
