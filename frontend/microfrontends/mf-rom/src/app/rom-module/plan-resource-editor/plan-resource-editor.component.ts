import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {AddResourceToGoal, LinkGoalResource, ResourcesState} from '../stores/resources.store';
import {Observable} from 'rxjs';
import {GoalState} from '../stores/goals.store';
import {Navigate} from '@ngxs/router-plugin';
import {
  FilterObservableProvider,

  ItemAbstract, ItemType,
  ProcessData,
  ResourceData
} from "@solenopsys/ui-controls";
import {DgraphService} from "@solenopsys/fl-dgraph";
import {FreeProvider} from "@solenopsys/ui-controls";


@Component({
    selector: 'app-plan-resource-editor',
    templateUrl: './plan-resource-editor.component.html',
    styleUrls: ['./plan-resource-editor.component.scss']
})
export class PlanResourceEditorComponent implements OnInit {
    @Select(ResourcesState.getAll) resourcesAll$!: Observable<ResourceData[]>;
    value$: Observable<ItemAbstract>;
    value: ItemAbstract;
    itemId: string;
    newSelect = false;
    selectValue: ProcessData;
    resourceProvider: FreeProvider;
    oppositeType: string;


    constructor(
        private dgraph: DgraphService,
        private activatedRoute: ActivatedRoute,
        private store: Store
    ) {
        this.activatedRoute.params.subscribe(
            (params) => {
                // @ts-ignore
              this.value$ = this.store.select(ResourcesState.getByID(params.id));
            });
    }

    ngOnInit(): void {
        this.resourceProvider = new FilterObservableProvider(this.resourcesAll$);
    }

    newItem(name: string) {
        const goalId = this.store.selectSnapshot(GoalState.getGoalId);
        this.store.dispatch(new AddResourceToGoal(name, goalId,
            (id) => new Navigate(['/rom/goals/plan/', goalId, ItemType.resource, id])));
    }

    linkToGoal() {
        const goalId = this.store.selectSnapshot(GoalState.getGoalId);
        this.store.dispatch(new LinkGoalResource(this.selectValue.id, goalId));
        this.newSelect = false;
    }
}
