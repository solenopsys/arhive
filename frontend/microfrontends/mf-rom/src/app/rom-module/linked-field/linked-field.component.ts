import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {LinkGoalProcess} from '../stores/processes.store';
import {GoalState} from '../stores/goals.store';
import {Store} from '@ngxs/store';
import {LinkGoalResource} from '../stores/resources.store';
import { ItemAbstract, ItemType, ProcessData} from "@solenopsys/ui-controls";
import {FreeProvider} from "@solenopsys/ui-controls";

@Component({
    selector: 'app-linked-field',
    templateUrl: './linked-field.component.html',
    styleUrls: ['./linked-field.component.scss']
})
export class LinkedFieldComponent implements OnInit {

    @Input()
    value$: Observable<ItemAbstract>;
    @Output()
    createNewItem = new EventEmitter<string>();

    @Output()
    linkSelected = new EventEmitter<string>();
    selectValue: ProcessData;
    newSelect = false;
    @Input()
    provider: FreeProvider;
    @Input()
    type: ItemType;


    constructor(private store: Store) {
    }

    ngOnInit(): void {
    }

    linkToGoal() {
        const goalId = this.store.selectSnapshot(GoalState.getGoalId);
        this.store.dispatch(this.type === ItemType.process ?
            new LinkGoalProcess(this.selectValue.id, goalId) :
            new LinkGoalResource(this.selectValue.id, goalId));
        this.newSelect = false;
        this.linkSelected.emit(this.selectValue.id);
    }
}
