import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlanUiService} from '../services/plan-ui.service';
import {Router} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {AddProcessToGoal, ProcessesState} from '../stores/processes.store';
import {Observable} from 'rxjs';
import {AddResourceToGoal, ResourcesState} from '../stores/resources.store';
import {
  FilterObservableProvider,
  ItemAbstract,
  ItemLink,
  ItemType,
  ProcessData,
  ResourceData
} from "@solenopsys/ui-controls";

@Component({
    selector: 'app-plan-link',
    templateUrl: './plan-link.component.html',
    styleUrls: ['./plan-link.component.scss']
})
export class PlanLinkComponent implements OnInit {
    @Select(ProcessesState.getAll) processesAll$!: Observable<ProcessData[]>;
    @Select(ResourcesState.getAll) resourcesAll$!: Observable<ResourceData[]>;
    @Input()
    value: ItemLink;
    @Output()
    valueChange = new EventEmitter<ItemLink>();

    provider: any = {};
    @Input()
    goalId;

    valueField: ItemAbstract;

    @Input()
    type: ItemType;

    constructor(private planUi: PlanUiService, private router: Router, private store: Store) {
        this.provider.process = new FilterObservableProvider(this.processesAll$);
        this.provider.resource = new FilterObservableProvider(this.resourcesAll$);
    }

    ngOnInit(): void {
        // this.planUi.loadItem(this.value.id, this.type, this.goalId).then(val => this.valueField = val);
    }

    newItem(name: string, type: string) {
        this.store.dispatch(type === ItemType.resource ?
            new AddResourceToGoal(name, this.goalId) :
            new AddProcessToGoal(name, this.goalId));
    }

    changeSize(newSize: any) {
        this.value.count = newSize;
        this.valueChange.emit(this.value);
    }

    changeItem($event: any) {
        this.value.id = $event.id;
        this.valueChange.emit(this.value);
    }

    remove() {
        /*  this.value[this.ioType]?.splice(index, 1);
          console.log('REMOVE');*/
    }

    go() {
        // this.router.navigate(['../../', this.type, id], {relativeTo: this.activatedRoute});
    }

}
