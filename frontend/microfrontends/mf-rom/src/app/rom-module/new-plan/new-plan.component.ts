import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';
import {LoadResources, ResourcesState, UnlinkGoalResource} from '../stores/resources.store';
import {SelectGoal} from '../stores/goals.store';
import {Observable} from 'rxjs';
import {LoadProcesses, ProcessesState, UnlinkGoalProcess} from '../stores/processes.store';

import {
  FilterObservableProvider,

  ItemType,
  ProcessData,
  ResourceData
} from "@solenopsys/ui-controls";
import {LoadLinks} from "../stores/link.model";
import {FreeProvider} from "@solenopsys/ui-controls";


@Component({
    selector: 'app-new-plan',
    templateUrl: './new-plan.component.html',
    styleUrls: ['./new-plan.component.scss']
})
export class NewPlanComponent implements OnInit {
    goalId: string;
    @Select(ProcessesState.getAll) processesAll$!: Observable<ProcessData[]>;
    @Select(ResourcesState.getAll) resourcesAll$!: Observable<ResourceData[]>;

    types = ItemType;


    itemsAction = [{icon: '/assets/icons/01-Interface-Essential/27-Link-Unlink/link-broken.svg', title: 'Отвязать от цели', key: 'unlink'}];

    resources$: Observable<ResourceData[]>;
    processes$: Observable<ProcessData[]>;

    processProvider: FreeProvider;
    resourceProvider: FreeProvider;

    constructor(
        private route: ActivatedRoute,
        private store: Store,
    ) {
    }


    ngOnInit(): void {
        this.route.params.subscribe((params: any) => {
            this.goalId = params.id;
            this.store.dispatch(new SelectGoal(params.id));
            this.store.dispatch(new LoadResources());
            this.store.dispatch(new LoadProcesses());
            this.store.dispatch(new LoadLinks());
            this.resources$ = this.store.select(ResourcesState.getByGoalID(this.goalId));
            this.processes$ = this.store.select(ProcessesState.getByGoalID(this.goalId));

            this.processProvider = new FilterObservableProvider(this.processesAll$);
            this.resourceProvider = new FilterObservableProvider(this.resourcesAll$);
        });
    }

    unlinkFromGoal() {

    }

    itemAction(params: { key: string; item?: any }, type: string) {
        console.log('PARAMS', params, type);
        switch (params.key) {
            case 'add': {
                this.store.dispatch(new Navigate(['/rom/goals/plan/', this.goalId, type, 'new']));
                break;
            }
            case 'unlink': {
                this.store.dispatch(type === 'process' ?
                    new UnlinkGoalProcess(params.item.id, this.goalId) :
                    new UnlinkGoalResource(params.item.id, this.goalId));
                break;
            }
            case 'click': {
                this.store.dispatch(new Navigate(['/rom/goals/plan/', this.goalId, type, params.item?.id]));
                break;
            }
        }

    }
}
