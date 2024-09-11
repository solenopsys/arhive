import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { append, patch, removeItem } from "@ngxs/store/operators";
import {HelmInstallerService} from "./installer/installer.service";


export class ChartInstallation {
  digest!: string;
  name!: string;
  repository!: string;
  version!: string;
}

export class InstallationsStateModel {
  installations!: ChartInstallation[];
  loaded!: boolean;
}

export class LoadInstallations {
  static readonly type = "[ChartInstallation] Load";

  constructor() {
  }
}

export class AddInstallation {
  static readonly type = "[ChartInstallation] Add";

  constructor(public chart: ChartInstallation) {
  }
}

export class DeleteInstallation {
  static readonly type = "[ChartInstallation] Delete";

  constructor(public chart: ChartInstallation) {
  }
}

@State<InstallationsStateModel>({
  name: "helm_charts_installations",
  defaults: {
    installations: [],
    loaded: false
  }
})
@Injectable()
export class InstallationsState {
  constructor(private installerService: HelmInstallerService) {
  }

  @Selector()
  static getInstallation(state: InstallationsStateModel): ChartInstallation[] {
    return state.installations;
  }

  @Action(LoadInstallations)
  async load({ getState, setState }: StateContext<InstallationsStateModel>) {
    let installations = await this.installerService.getCharts("", true);
    setState({
      ...getState(),
      installations: installations.charts,
      loaded: true
    });
  }

  @Action(AddInstallation)
  async add({ getState, setState }: StateContext<InstallationsStateModel>, { chart }: AddInstallation) {
    let operationStatus = await this.installerService.installChart({
      digest: chart.digest,
      name: chart.name,
      version: chart.version,
      repository: chart.repository
    });

    if (operationStatus.status === "CHART_CREATED") {
      setState(
        patch({ installations: append([chart]) })
      );
    }


  }

  @Action(DeleteInstallation)
  async delete({ getState, setState }: StateContext<InstallationsStateModel>, { chart }: DeleteInstallation) {
    let operationStatus = await this.installerService.uninstallChart(chart.name); //todo fix it
    if (operationStatus.status === "CHART_DELETED") {
      setState(
        patch({ installations: removeItem<ChartInstallation>(item => item!.digest === chart.digest) })
      );
    }
  }
}
