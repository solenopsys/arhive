import {Injectable} from '@angular/core';
import {DgraphService} from "@solenopsys/fl-dgraph";
import {GraphItem} from "@solenopsys/ui-controls";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PathDgraphService {

  constructor(private dg: DgraphService) {
  }


  getProcesses(resources: any[], items: GraphItem[], after?: GraphItem): Promise<string[]> {
    const topProcesses: string[] = [];
    return new Promise((resolve, error) => {
      console.log('START PROCESS INSIDE', resources, items);
      resources.forEach(resource => {
        const processesPromises = [];
      processesPromises.push(  firstValueFrom(this.dg.getProcesses(resource.uid)));
        Promise.all(processesPromises).then((processesGroups: []) => {
          processesGroups.forEach((process: []) => {
            if (process.length === 0) {
              resolve(topProcesses);
            } else {
              process.forEach((pr: any) => {
                const pUID = pr.uid;
                topProcesses.push(pUID);
                const item = {id: pUID, name: pr['rom.process'], before: [], count: 1, long: 10};
                after?.before.push(pUID);
                items.push(item);

                firstValueFrom(this.dg.getProcessInResources(pUID)).then((resResources: any[]) => {
                  if (resResources) {
                    this.getProcesses(resResources, items, item).then(res => resolve(topProcesses)).catch(e => error(e));
                  } else {
                    resolve(topProcesses);
                  }
                }).catch(e => error(e));
              });
            }
          });
        }).catch(e => error(e));
      });
    });

  }


  buildPath(goalId: string): Promise<{ items: GraphItem[], rootIds: string[] }> {
    return new Promise((resolve, error) => {
      const items: GraphItem[] = [];
      firstValueFrom(this.dg.getGoalResources(goalId)).then((resources:any) => {
        this.getProcesses(resources, items).then((rootIds: string[]) =>
          resolve({items, rootIds})).catch(e => error(e));
      }).catch(e => error(e));
    });
  }
}
