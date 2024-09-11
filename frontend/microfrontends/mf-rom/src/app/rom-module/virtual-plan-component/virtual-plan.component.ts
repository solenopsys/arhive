import {Component, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Select, Store} from '@ngxs/store';
import {Goal, GoalState, LoadGoals} from '../stores/goals.store';

@Component({
    selector: 'app-virtual-plan-component',
    templateUrl: './virtual-plan.component.html',
    styleUrls: ['./virtual-plan.component.scss']
})
export class VirtualPlanComponent implements OnInit {
    goals: any[];

    @Select(GoalState.getGoals) goals$!: Observable<Goal[]>;

  @Select(GoalState.areLoaded) areGoalsLoaded$;
    areCoursesLoadedSub: Subscription;

    constructor(private store: Store) {
    }

    ngOnInit(): void {
        this.areCoursesLoadedSub = this.areGoalsLoaded$.pipe(
            tap((areCoursesLoaded) => {
                if (!areCoursesLoaded) {
                    this.store.dispatch(new LoadGoals());
                }
            })
        ).subscribe(value => {
            console.log(value);
        });

    }

}
