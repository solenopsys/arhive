import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {DgraphService} from "@solenopsys/fl-dgraph";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RomService {

  constructor(private dgraph: DgraphService) {
  }

  public findProcesses(): Promise<any> {
    return firstValueFrom(this.dgraph.query(
      '{  var(func: has(rom.execution )) {rom.execution {L  AS  uid}} ' +
      '  processes(func: has(rom.process )) @filter(not uid(L)){uid rom.process inResources @facets(count) {uid rom.resource} } ' +
      '} '));
  }

  public findActiveProcesses(): Promise<any> {
    return firstValueFrom(this.dgraph.query(
      '{  var(func: has(rom.execution )) @filter( eq(complete, "false") ) {rom.execution {L  AS  uid}} ' +
      '  processes(func: has(rom.process )) @filter( uid(L)){uid rom.process   inResources  @facets(count) {uid rom.resource} }' +
      '  } '));
  }

  public findEndedProcesses(): Promise<any> {
    return firstValueFrom(this.dgraph.query('{  var(func: has(rom.execution )) @filter( eq(complete, "true") ) {rom.execution {L  AS  uid}} ' +
      '  processes(func: has(rom.process )) @filter( uid(L)){uid rom.process inResources  @facets(count) {uid rom.resource} } ' +
      '} '));
  }

  public createExecution(uid: string, description: string) {
    return firstValueFrom(this.dgraph.mutate(
      '{ set { _:x  <rom.execution> <' + uid + '> . \n' +
      '_:x  <date> "' + new Date().toISOString() + '" .\n' +
      '_:x  <description> "' + description + '" .\n' +
      '_:x  <complete> "false" .\n' +
      '}  }'
    ));
  }

  public async finaliseExecution(uid: string) {
    const res:any=await firstValueFrom(this.dgraph.query(
      `{ execution(func: has(rom.execution ))@cascade{uid rom.execution @filter(uid( ${uid} )){uid } } } `));
    const exUid = res.execution[0].uid;
    return firstValueFrom(this.dgraph.mutate('{ set { <' + exUid + '> <complete> "true" .}  }'));
  }

  public findOutResources(uid: string): Promise<{ uid: string, count: number, name: string }[]> {

    return firstValueFrom<{ uid: string, count: number, name: string }[]>(
      this.dgraph.query(
        `{ results(func: uid( ${uid} )) { outResources @facets(count) {uid rom.resource} } } `
      ).pipe(map((res: any) => {
        return res.data.results.outResources.map(item => {
          return {uid: item.uid, count: item['outResources|count'], name: item['rom.resource']};
        });
      })));
  }

  public createObjects(resources: { uid: string, count: number, name: string }[], whereIsUid: string): Promise<any> {

    let q = '';
    resources.forEach((item, index) => {


      let c = item.count;
      if (c === undefined) {
        c = 1;
      }

      for (let x = 0; x < c; x++) {
        const v = 'x' + index + '_' + x;
        q = q + `set { ` +
          `_:${v}  <rom.object> <${item.uid}> . \n ` +
          `_:${v}  <where_is> <${whereIsUid}> .  \n ` +
          `_:${v}  <name> "${item.name} ${x}" .  \n ` +
          `_:${v} <date> "${new Date().toISOString()} " .  \n ` +
          `}  \n`;
      }
    });


    q = '{ ' + q + ' }';

    console.log('ObjectsQuery', q);
    return firstValueFrom(this.dgraph.mutate(q));
  }

}
