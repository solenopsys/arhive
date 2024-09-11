import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {ProcessesState} from '../stores/processes.store';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {GoalState} from '../stores/goals.store';
import {ResourcesState} from '../stores/resources.store';
import {DgraphService} from "@solenopsys/fl-dgraph";
import {
  Direction,
  FilterObservableProvider,
  ItemAbstract,
  ItemType,
  ProcessData
} from "@solenopsys/ui-controls";
import {FreeProvider} from "@solenopsys/ui-controls";

@Component({
    selector: 'app-plan-process-editor',
    templateUrl: './plan-process-editor.component.html',
    styleUrls: ['./plan-process-editor.component.scss']
})
export class PlanProcessEditorComponent implements OnInit {
    @Select(ProcessesState.getAll) processesAll$!: Observable<ProcessData[]>;
    @Select(ProcessesState.getAll) resourcesAll$!: Observable<ProcessData[]>;

    processProvider!: FreeProvider;
    resourceProvider!: FreeProvider;
    providers: any = {};


    goalId!: string;
    from$!:Observable<any>;
    to$!:Observable<any>;

    DIR = Direction;
    TYPES = ItemType;

    value$!: Observable<ItemAbstract>;


    constructor(
        private dgraph: DgraphService,
        private activatedRoute: ActivatedRoute,
        private store: Store
    ) {
        this.activatedRoute.params.subscribe(
            (params) => {
                // @ts-ignore
              this.value$ = this.store.select(ProcessesState.getByID(params.id));
            });
    }

    ngOnInit(): void {
        this.processProvider = new FilterObservableProvider(this.processesAll$);
        this.resourceProvider = new FilterObservableProvider(this.resourcesAll$);
        this.goalId = this.store.selectSnapshot(GoalState.getGoalId);

        this.from$ = this.store.select(ResourcesState.getByGoalID(this.goalId));
        this.to$ = this.store.select(ProcessesState.getByGoalID(this.goalId));
    }




}
