import {Inject, Injectable} from "@angular/core";
import {ContentServiceIntf} from "./content.service";
import {Action, createSelector, State, StateContext} from "@ngxs/store";
import {firstValueFrom} from "rxjs";
import {patch} from "@ngxs/store/operators";
import {Fragment} from "./model";


export class FragmentsStateModel {
    fragments!: { [uid: string]: Fragment };
}

export class LoadFragment {
    static readonly type = '[TextFragment] Load';

    constructor(public fragmentId: string) {
    }
}



export class FragmentVersionUpdated {
    static readonly type = '[TextFragment] Version Updated';

    constructor(public fragmentId: string, public versionId: string) {
    }
}


@State<FragmentsStateModel>({
    name: "fragment",
    defaults: {
        fragments: {},
    }
})
@Injectable()
export class FragmentState {
    constructor(@Inject('contentService') private contentService: ContentServiceIntf) {
    }

    static getById(id: string) {
        return createSelector([FragmentState], (state: FragmentsStateModel) => {
            return state.fragments[id];
        });
    }

    static isLoadedId(id: string) {
        return createSelector([FragmentState], (state: FragmentsStateModel) => {
            return state.fragments[id] !== undefined;
        });
    }

    @Action(LoadFragment)
    async loadFragment({getState, setState}: StateContext<FragmentsStateModel>, {fragmentId}: LoadFragment) {
        const fragment = await firstValueFrom(this.contentService.loadFragment(fragmentId))
        setState(patch(
            {
                fragments: patch({
                    [fragmentId]: patch(fragment)
                })
            }
        ))
    }




}
