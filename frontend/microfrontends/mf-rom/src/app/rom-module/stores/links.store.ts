import {Action, createSelector, State, StateContext, Store} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {PlanUiService} from '../services/plan-ui.service';
import {append, patch} from '@ngxs/store/operators';
import {ResourceService} from "../services/resource.service";
import {AddDraftLink, Link, LinkStateModel, LoadLinks} from "./link.model";
import {firstValueFrom} from "rxjs";


@State<LinkStateModel>({
  name: 'links',
  defaults: {
    links: [],
    loaded: false
  }
})
@Injectable({
  providedIn: 'root'
})
export class LinkState {

  constructor(private planUI: PlanUiService) {
    console.log("DGRAPH LINK STATE")
  }


  static getByToId(toId: string) {
    console.log("STATIC 1")
    return createSelector([LinkState], (state: LinkStateModel) => {
      return state.links.filter(item => item.toId === toId);
    });
  }

  static getByFromId(fromId: string) {
    console.log("STATIC 2")
    return createSelector([LinkState], (state: LinkStateModel) => {
      return state.links.filter(item => item.fromId === fromId);
    });
  }


  @Action(AddDraftLink)
  newLink({getState, setState}: StateContext<LinkStateModel>, {link}: AddDraftLink) {
    setState(patch({links: append([link])}));
  }

  @Action(LoadLinks)
  async loadLinks({getState, setState}: StateContext<LinkStateModel>) {
    const links: Link [] = await firstValueFrom(this.planUI.getProcessInOutResources());
    setState({
      links,
      loaded: true
    });
  }
}
