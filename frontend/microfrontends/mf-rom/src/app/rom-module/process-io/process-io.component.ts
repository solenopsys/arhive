import {Component, Input, OnInit} from '@angular/core';
import {DgraphService} from "@solenopsys/fl-dgraph";
import {firstValueFrom} from "rxjs";


@Component({
  selector: 'app-process-io',
  templateUrl: './process-io.component.html',
  styleUrls: ['./process-io.component.scss']
})
export class ProcessIOComponent implements OnInit {

  @Input()
  processId: string;

  process;

  constructor(private dg: DgraphService) {
  }

  show = false;

  ngOnInit(): void {
    this.load();
  }

  async load() {
    const res = await firstValueFrom(this.dg.query<{ process: any[] }>(
      `{process(func: uid( ${this.processId} ))
      {uid  inResources @facets(count) {uid, rom.resource}
      outResources @facets(count) {uid, rom.resource}}}`))
    this.process = res.process[0];
  }

  async runExecution() {
    const query = '{ set { _:x  <rom.execution> <' + this.processId + '>.\n' +
      '      _:x  <date> "' + new Date().toISOString() + '".\n' +
      '    }  }';
    const res = await firstValueFrom(this.dg.mutate(query))
    console.log(res);
  }
}
