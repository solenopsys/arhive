import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {ClusterService} from "./cluster.service";
import {append, patch} from "@ngxs/store/operators";

const hostname = document.location.hostname;


export class Cluster {
  host!: string;
  title!: string;
  ssl!: boolean;
}

export class ClusterStateModel {
  clusters!: Cluster [];
  loaded!: boolean;
  current?: Cluster;
}


export class SelectCluster {
  static readonly type = "[Clusters] Select";

  constructor(public host: string) {
  }
}

export class LoadClusters {
  static readonly type = "[Clusters] Load All";
}

export class AddCluster {
  static readonly type = "[Clusters] Add New";

  constructor(public cluster: Cluster) {
  }
}

@State<ClusterStateModel>({
  name: "clusters",
  defaults: {
    clusters: [
     // { host:  hostname, title: "This", ssl: false },
    //  { host: "hc.alexstorm.solenopsys.org", title: "HomeServer", ssl: false },
      // { host: "hc.jetson2.solenopsys.org", title: "Jetson2", ssl: false },
      // { host: "hc.jetson4.solenopsys.org", title: "Jetson4", ssl: false },
      // { host: "hc.jetson6.solenopsys.org", title: "Jetson6", ssl: false },
      // { host: "hc.garage.solenopsys.org", title: "GarageServer", ssl: false }
    ],
    loaded: false,
    current: undefined!
  }
})
@Injectable()
export class ClusterState {
  constructor(private clusterService: ClusterService) {
  }

  @Selector()
  static getClusters(state: ClusterStateModel): Cluster[] {
    return state.clusters;
  }

  @Selector()
  static getCurrent(state: ClusterStateModel): Cluster|undefined {
    return state.current;
  }

  @Action(SelectCluster)
  select({ getState, setState }: StateContext<ClusterStateModel>, { host }: SelectCluster) {

    setState({
      ...getState(),
      current: getState().clusters.find(g => g.host === host)
    });
  }

  @Action(LoadClusters)
  load({ getState, setState }: StateContext<ClusterStateModel>) {
    setState({
      ...getState(),
      clusters: this.clusterService.getClusters(),
      loaded: true
    });
  }

  @Action(AddCluster)
  addNew({ getState, setState }: StateContext<ClusterStateModel>, { cluster }: AddCluster) {
    setState(
      patch({ clusters: append([cluster]) })
    );
  }
}
