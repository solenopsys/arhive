import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {AddProcessToGoal} from '../stores/processes.store';
import {Navigate} from '@ngxs/router-plugin';
import {Store} from '@ngxs/store';
import {GoalState} from '../stores/goals.store';
import {AddResourceToGoal} from '../stores/resources.store';
import {ActionButton,  ItemType} from "@solenopsys/ui-controls";
import {FreeProvider} from "@solenopsys/ui-controls";


@Component({
    selector: 'app-items-list',
    templateUrl: './items-list.component.html',
    styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
    @Input()
    title!: string;

    @Input()
    itemActions!: ActionButton[];

    @Input()
    clickActionKey!: string;

    @Input()
    items$!: Observable<any>;

    @Input()
    type: ItemType;


    @Input()
    provider!: FreeProvider;

    edit = false;

    addAction = {icon: '/assets/icons/01-Interface-Essential/43-Remove-Add/add-bold.svg', title: 'Добавить'};

    @Output()
    dispatch = new EventEmitter<{ key: string, item?: any }>();

    constructor(private store: Store) {
    }

    ngOnInit(): void {
    }

    clickActionEmmit(item: any) {
        this.dispatch.emit({key: this.clickActionKey, item});
    }

    actionItem(key: string, item: any) {
        this.dispatch.emit({key, item});
    }

    newItem(name: string) {
        const goalId = this.store.selectSnapshot(GoalState.getGoalId);
        this.store.dispatch(
            this.type === ItemType.process ?
                new AddProcessToGoal(name, goalId, (id:string) => new Navigate(['/rom/goals/plan/', goalId, this.type, id])) :
                new AddResourceToGoal(name, goalId, (id:string) => new Navigate(['/rom/goals/plan/', goalId, this.type, id]))
        );
        this.edit = false;
    }

    linkSelect(id: string) {
        this.edit = false;
        const goalId = this.store.selectSnapshot(GoalState.getGoalId);
        this.store.dispatch(this.type === ItemType.process ?
            new Navigate(['/rom/goals/plan/', goalId, this.type, id]) :
            new Navigate(['/rom/goals/plan/', goalId, this.type, id]));
    }
}
