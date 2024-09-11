import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { append, patch, removeItem } from "@ngxs/store/operators";
import {Chart} from "./lookup/api";
import {HelmLookupService} from "./lookup/lookup.service";



export class HelmRepository {
  url!: string;
  name!: string;

}

export class HelmRepositoryStateModel {
  repositories!: HelmRepository[];
   filter!: string;
  filteredCharts!: Chart[];
  loaded!: boolean;
}

export class LoadRepositories {
  static readonly type = "[HelmRepository] Load";

  constructor() {
  }
}

export class AddHelmRepository {
  static readonly type = "[HelmRepository] Add New";

  constructor(public url: string, public name: string) {
  }
}

export class LoadFilteredChartsRepository {
  static readonly type = "[HelmRepository] Load Filtered Charts";

  constructor(public filter: string,public reload: boolean) {
  }
}

export class RemoveHelmRepository {
  static readonly type = "[HelmRepository] Remove Repository";

  constructor(public name: string) {
  }
}

@State<HelmRepositoryStateModel>({
  name: "helm_repositories",
  defaults: {
    repositories: [],
    filter: "",
    filteredCharts: [],
    loaded: false
  }
})
@Injectable()
export class HelmRepositoriesState {
  constructor(private helmLookup: HelmLookupService, private store: Store) {
  }

  @Selector()
  static getRepositories(state: HelmRepositoryStateModel): HelmRepository[] {
    return state.repositories;
  }

  @Selector()
  static getCharts(state: HelmRepositoryStateModel): Chart[] {
    return state.filteredCharts;
  }

  @Selector()
  static getFilter(state: HelmRepositoryStateModel): string {
    return state.filter;
  }

  @Action(LoadFilteredChartsRepository)
  async loadCharts({
                     getState,
                     setState
                   }: StateContext<HelmRepositoryStateModel>, { filter,reload }: LoadFilteredChartsRepository) {
    let reposResponse = await this.helmLookup.getCharts(filter,reload);
    setState({
      ...getState(),
      filter: filter,
      filteredCharts: reposResponse.charts,
      loaded: true
    });
  }


  @Action(LoadRepositories)
  async load({ getState, setState }: StateContext<HelmRepositoryStateModel>) {
    let reposResponse = await this.helmLookup.getRepos("");
    setState({
      ...getState(),
      repositories: reposResponse.repos,
      loaded: true
    });
    this.store.dispatch(new LoadFilteredChartsRepository(getState().filter,true));
  }

  @Action(AddHelmRepository)
  async addNew({ getState, setState }: StateContext<HelmRepositoryStateModel>, { url, name }: AddHelmRepository) {
    let operationStatus = await this.helmLookup.addRepo(url, name);
    if (operationStatus.status) {
      setState(
        patch({ repositories: append([{ url, name }]) })
      );
    }

  }


  @Action(RemoveHelmRepository)
  async remove({ getState, setState }: StateContext<HelmRepositoryStateModel>, { name }: RemoveHelmRepository) {
    let operationStatus = await this.helmLookup.removeRepo(name);
    if (operationStatus.status) {
      setState(
        patch({ repositories: removeItem<HelmRepository>(item => name === item!.name) })
      );
    }
  }
}
