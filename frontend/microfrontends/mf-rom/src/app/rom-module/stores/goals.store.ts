import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {PlanUiService} from '../services/plan-ui.service';


export class Goal {
  key!: string;
  title!: string;
}

export class LoadGoals {
  static readonly type = '[Goals] Load All';

  constructor() {
  }
}


export class SelectGoal {
  static readonly type = '[Goals] Select';

  constructor(public id: string) {
  }
}


export class GoalStateModel {
  goals!: Goal [];
  loaded!: boolean;
  goalId!: string | undefined;
}


@State<GoalStateModel>({
  name: 'goals',
  defaults: {
    goals: [],
    loaded: false,
    goalId: undefined
  }
})
@Injectable()
export class GoalState {
  constructor(private planUi: PlanUiService) {
  }

  @Selector()
  static areLoaded(state: GoalStateModel) {
    return state.loaded;
  }

  @Selector()
  static getCurrentGoal(state: GoalStateModel) {
    return state.goals.find(g => g.key === state.goalId);
  }

  @Selector()
  static getGoals(state: GoalStateModel) {
    return state.goals;
  }

  @Selector()
  static getGoalId(state: GoalStateModel) {
    return state.goalId;
  }


  @Action(SelectGoal)
  select({getState, setState}: StateContext<GoalStateModel>, {id}: SelectGoal) {
    setState({
      ...getState(),
      goalId: id
    });
  }


  @Action(LoadGoals)
  load({getState, setState}: StateContext<GoalStateModel>) {
    console.log("GOAL LOAD")
    this.planUi.loadGoals().then(
      (result => {
        setState({
          ...getState(),
          goals: result,
          loaded: true
        });
      }));
  }
}

