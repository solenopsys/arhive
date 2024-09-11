import {Component, Input, OnInit} from '@angular/core';
import {PathDgraphService} from "../services/path-dgraph.service";
import {GraphItem} from "@solenopsys/ui-controls";

@Component({
  selector: 'app-goal-path-tree',
  templateUrl: './goal-path-tree.component.html',
  styleUrls: ['./goal-path-tree.component.scss']
})
export class GoalPathTreeComponent implements OnInit {

  @Input()
  goalId;

  data: { items: GraphItem[], rootIds: string[] };

  initOk = false;

  constructor(private pdg: PathDgraphService) {
  }


  ngOnInit(): void {
    this.pdg.buildPath(this.goalId).then(data => {
      this.data = data;
    }).catch(e => console.error(e));
  }

}
