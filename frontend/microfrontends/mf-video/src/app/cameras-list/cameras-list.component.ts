import {Component, OnInit} from '@angular/core';
import {DgraphService} from "@solenopsys/fl-dgraph";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-cameras-list',
  templateUrl: './cameras-list.component.html',
  styleUrls: ['./cameras-list.component.scss']
})
export class CamerasListComponent implements OnInit {
  cameras;

  constructor(private dgraph: DgraphService) {
  }

  ngOnInit(): void {
    this.load();
  }

  async load() {
    this.cameras = (await firstValueFrom(this.dgraph.query<any>(
      '{ results(func: has(camera.folder)) {uid camera.folder description port enabled}}'
    ))).results;
    console.log('RESULT',this.cameras);
  }

}
