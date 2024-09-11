import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Goal} from '../stores/goals.store';
import {firstValueFrom, Observable} from 'rxjs';
import {DgraphService} from "@solenopsys/fl-dgraph";
import {Link} from "../stores/link.model";
import {ItemLink} from "@solenopsys/ui-controls";

const transformProcess = (o: any) => {
  return {id: o.uid, title: o['rom.process']};
};


export const convertGoalItems = (keyGoal: string, keyItem: string, res: { goalLinks: any[]; items: any[] }) => {
  console.log('RES', res);
  const items = res.items.map((o: any) => {
    return {id: o.uid, title: o[keyItem], goals: []};
  });

  const goalsKeys: { [key: string]: any } = {};
  for (const r of items) {
    goalsKeys[r.id] = r;
  }

  for (const gl of res.goalLinks) {
    for (const r of gl[keyGoal]) {
      const resLink = goalsKeys[r.uid];
      if (resLink) {
        resLink.goals.push(gl.uid);
      }
    }

  }
  console.log('RESULT', items);
  return items;
};

const transform = (res: any): Link[] => {
  console.log('START TRANSFORM', res);
  const links: Link[] = [];
  for (const r of res) {
    const id = r.uid;

    if (r.inResources) {
      for (const inR of r.inResources) {
        const link = new Link();
        link.fromId = inR.uid;
        link.toId = id;
        link.count = 1;
        links.push(link);
      }
    }
    if (r.outResources) {
      for (const outR of r.outResources) {
        const link = new Link();
        link.toId = outR.uid;
        link.fromId = id;
        link.count = 1;
        links.push(link);
      }
    }
  }
  console.log('RES LINKS', links);
  return links;
};

@Injectable({
  providedIn: 'root'
})
export class PlanUiService {


  constructor(private dgraph: DgraphService) {
    console.log("DGRAPH PlanUiService")
  }

  loadGoalItems(goalId: string): Promise<{ processes: any [], resources: any[] }> {
    return firstValueFrom(this.dgraph.query(
      `{ results(func: uid(${goalId})) {uid   resources  {uid rom.resource} processes
       {uid  rom.process inResources @facets(count) {uid } outResources @facets(count) {uid}}  }}`
    ))
  }

  loadGoals(): Promise<Goal[]> {
    return firstValueFrom(this.dgraph.query(
      '{ goals(func: has(rom.goal))@filter(eq(achieved, false) ) {uid rom.goal achieved}}')
      .pipe(map(((result: any) => {
        return (result.goals.map((item: any) => {
          return {key: item.uid, title: item['rom.goal']}
        }));
      }))));
  }

  loadItemFromDb(id: string, type: string): Promise<any> {
    const resQ = `{ results(func: uid(${id}) ){uid rom.resource}}`;
    const procQ = `{ results(func: uid(${id}) ){uid rom.process}}`;

    const qm: { [key: string]: any } = {
      resource: {
        q: resQ, func: (o: any) => {
          return {id: o.uid, title: o['rom.resource']};
        }
      },
      process: {q: procQ, func: transformProcess}
    };
    return firstValueFrom(this.dgraph.query(qm[type].q).pipe(map((d: any) => {
      return qm[type].func(d.results[0]);
    })));
  }

  changeLink(ioType: string, mainId: string, newValue: ItemLink, currentValue: ItemLink) {
    console.log('CHANGE', ioType, mainId, currentValue, newValue);
  }

  getProcessInOutResources(): Observable<any> {
    const query = `{res(func: has(rom.process)) @filter(has(inResources) or has(outResources)  )  {uid   inResources {uid} outResources {uid}}}`;
    return this.dgraph.query(query).pipe(map((data:any) => data.res)).pipe(map(transform));
  }

  // getProcesses(resourceId): Observable<any> {
  //     const query = `{res(func: has(rom.process)) @cascade {uid  rom.process  outResources @filter(uid(${resourceId})) {uid }}}`;
  //     return this.query(query).pipe(map(data => data.res));
  // }

  getGoalResources(goalId: string): Observable<Link[]> {
    const queryRes = `{res(func:  uid(${goalId})){resources {uid, rom.resource}}}`;
    return this.dgraph.query(queryRes).pipe(map((data:any) => data.res[0].resources));
  }
}
