import {Action, createSelector, NgxsAfterBootstrap, Selector, State, StateContext, Store} from '@ngxs/store';

import {Injectable} from '@angular/core';
import {PlanUiService} from '../services/plan-ui.service';
import {ResourceService} from '../services/resource.service';
import {append, patch, removeItem, updateItem} from '@ngxs/store/operators';
import {ResourceData} from "@solenopsys/ui-controls";
import {ProcessesStateModel} from "./processes.store";

export class ResourcesStateModel {
  public resources!: ResourceData[];
  public loaded!: boolean;
}

export class AddResourceToGoal {
  static readonly type = '[Resources] Add Resource';

  constructor(
    public name: string,
    public goalId: string,
    public redirect?: any
  ) {
  }
}

export class LoadResources {
  static readonly type = '[Resources] Load All Resource';

  constructor() {
  }
}

export class UnlinkGoalResource {
  static readonly type = '[Resource] Unlink From Goal';

  constructor(public id: string, public goalId: string) {
  }
}

export class LinkGoalResource {
  static readonly type = '[Resource] Link To Goal';

  constructor(public id: string, public goalId: string) {
  }
}


@State<ResourcesStateModel>({
  name: 'resources',
  defaults: {
    resources: [],
    loaded: false,
  }
})
@Injectable()
export class ResourcesState {

  constructor(private planUi: PlanUiService, private resourceService: ResourceService, private store: Store) {
  }


  static getByID(editId: string) {
    return createSelector([ResourcesState], (state: ResourcesStateModel) => {
      return state.resources.find(g => g.id === editId);
    });
  }

  static getByGoalID(goalId: string) {
    return createSelector([ResourcesState], (state: ResourcesStateModel) => {
      return state.resources.filter(item => item.goals?.indexOf(goalId + '') > -1);
    });
  }

  @Selector()
  static getAll(state: ResourcesStateModel) {
    return state.resources;
  }

  @Selector()
  static areLoaded(state: ResourcesStateModel) {
    return state.loaded;
  }

  @Action(AddResourceToGoal)
  create({getState, setState}: StateContext<ResourcesStateModel>, {name, goalId, redirect}: AddResourceToGoal) {
    this.resourceService.saveResource(name, goalId).then((uid: any) => {
      setState({
        ...getState(),
        resources: [...getState().resources, {id: uid, title: name, goals: [goalId]}]
      });

      if (redirect) {
        this.store.dispatch(redirect(uid));
      }
    });
  }

  @Action(LoadResources)
  loadAll({getState, setState}: StateContext<ResourcesStateModel>) {
    this.resourceService.loadResources().then(
      (result => {
        setState({
          ...getState(),
          resources: result,
          loaded: true
        });
      }));
  }

  @Action(LinkGoalResource)
  linkToGoal({getState, setState}: StateContext<ResourcesStateModel>, lg: LinkGoalResource) {
    this.resourceService.linkResource(lg.goalId, lg.id).then(res => {
      setState(patch({
        resources: updateItem<ResourceData>(
          resources => resources?.id === lg.id,
          patch({goals: append([lg.goalId])})
        )
      }));
    });
  }

  @Action(UnlinkGoalResource)
  unlink({getState, setState}: StateContext<ResourcesStateModel>, lg: UnlinkGoalResource) {
    this.resourceService.unlinkResource(lg.goalId, lg.id).then(res => {

      setState(patch({
        resources: updateItem<ResourceData>(
          resources => resources?.id === lg.id,
          patch({goals: removeItem(gId => gId === lg.goalId)})
        )
      }));
    });
  }
}


