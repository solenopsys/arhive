
import {Action, createSelector, Selector, State, StateContext, Store} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {PlanUiService} from '../services/plan-ui.service';
import {ProcessService} from '../services/process.service';
import {append, patch, removeItem, updateItem} from '@ngxs/store/operators';
import {ProcessData} from "@solenopsys/ui-controls";

export class ProcessesStateModel {
    public processes!: ProcessData[];
    public loaded!: boolean;
}


export class AddProcessToGoal {
    static readonly type = '[Processes] Add Process';

    constructor(
        public name: string,
        public goalId: string,
        public redirect?: any
    ) {
    }
}

export class LoadProcesses {
    static readonly type = '[Processes] Load All Processes';

    constructor() {
    }
}

export class UnlinkGoalProcess {
    static readonly type = '[Processes] Unlink From Goal';

    constructor(public id: string, public goalId: string) {
    }
}

export class LinkGoalProcess {
    static readonly type = '[Processes] Link To Goal';

    constructor(public id: string, public goalId: string) {
    }
}


@State<ProcessesStateModel>({
    name: 'processes',
    defaults: {
        processes: [],
        loaded: false,
    }
})
@Injectable()
export class ProcessesState {

    constructor(private planUi: PlanUiService, private processService: ProcessService, private store: Store) {
    }

    static getByGoalID(goalId: string) {
        return createSelector([ProcessesState], (state: ProcessesStateModel) => {
            // @ts-ignore
          return state.processes.filter(item => item.goals?.indexOf(goalId + '') > -1);
        });
    }

    static getByID(editId: string) {
        return createSelector([ProcessesState], (state: ProcessesStateModel) => {
            return state.processes.find(g => g.id === editId);
        });
    }

    @Selector()
    static getAll(state: ProcessesStateModel) {
        return state.processes;
    }

    @Selector()
    static areLoaded(state: ProcessesStateModel) {
        return state.loaded;
    }

    @Action(AddProcessToGoal)
    create({getState, setState}: StateContext<ProcessesStateModel>, {name, goalId, redirect}: AddProcessToGoal) {
        this.processService.saveProcess(name, goalId).then((uid: any) => {
            setState({
                ...getState(),
                processes: [...getState().processes, {id: uid, title: name, goals: [goalId]}] // todo изменить на patch append
            });
            if (redirect) {
                this.store.dispatch(redirect(uid));
            }
        });
    }

    @Action(LoadProcesses)
    loadAll({getState, setState}: StateContext<ProcessesStateModel>) {
        this.processService.loadProcesses().then(
            (result => {
                setState({
                    ...getState(),
                    processes: result,
                    loaded: true
                });
            }));
    }

    @Action(LinkGoalProcess)
    linkToGoal({getState, setState}: StateContext<ProcessesStateModel>, lg: LinkGoalProcess) {
        this.processService.linkProcess(lg.goalId, lg.id).then(res => {
            setState(patch({
                processes: updateItem<ProcessData>(processes => processes?.id === lg.id, patch({goals: append([lg.goalId])}))
            }));
        });
    }

    @Action(UnlinkGoalProcess)
    unlink({getState, setState}: StateContext<ProcessesStateModel>, lg: LinkGoalProcess) {
        this.processService.unlinkProcess(lg.goalId, lg.id).then(res => {
            setState(patch({
                processes: updateItem<ProcessData>(
                    resources => resources?.id === lg.id,
                    patch({goals: removeItem(gId => gId === lg.goalId)})
                )
            }));
        });


    }
}
