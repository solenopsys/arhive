import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DgraphService} from "@solenopsys/fl-dgraph";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'sc-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DashboardComponent implements OnInit {
  integrated: any[]
  notIntegrated: any[]
  len: number;

  constructor(private dgraph: DgraphService) {
  }

  ngOnInit(): void {

  }

  async load() {
    const res = await firstValueFrom(this.dgraph.query(
      "{integrated(func:  has(rom.object)) @filter( has(integrated)) " +
      "{uid rom.object {uid resourceType{name rom.resource.type}}  name integrated {uid}}}")
    )

    this.integrated = res['integrated']
    this.len = this.integrated.length;
  }

}
