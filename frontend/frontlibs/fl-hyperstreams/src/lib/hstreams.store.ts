import {Action, createSelector, State, StateContext, Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {patch} from "@ngxs/store/operators";
import {WsPool} from "./ws-pool";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

const filterMap = (map: { [key: string | number | symbol]: any }, id: any): { [key: string | number | symbol]: any } => {
  return Object.keys(map)
    .filter(key => key != id)
    .reduce((obj: any, key) => {
      obj[key] = map[key];
      return obj;
    }, {});
};


enum WebSocketState {
  NEW,
  CONNECTED,
  ACTIVE,
  ERROR,
  DISCONNECTED
}


export class HStreamStateModel {
  servicesMapping!: { [url: string]: { [serviceName: string]: number } };
  sockets!: { [url: string]: WebSocketState };
}


export class AddSocket {
  static readonly type = "[HStreams] Add Socket";

  constructor(public url: string) {
  }
}


export class ConnectSocket {
  static readonly type = "[HStreams] Connect Socket";

  constructor(public url: string) {
  }
}

export class SocketConnected {
  static readonly type = "[HStreams] Socket Connected ";

  constructor(public url: string) {
  }
}

export class DisconnectSocket {
  static readonly type = "[HStreams] Disconnect Socket";

  constructor(public url: string) {
  }
}


export class RemoveSocket {
  static readonly type = "[HStreams] Remove Socket";

  constructor(public url: string) {
  }
}

export class ErrorSocket {
  static readonly type = "[HStreams] Error Socket";

  constructor(public url: string, public message: string) {
  }
}

export class UpdateServiceMapping {
  static readonly type = "[HStreams] Update Service Mapping";

  constructor(public url: string, public httpUrl: string) {
  }
}


@State<HStreamStateModel>({
  name: "hstreams",
  defaults: {
    servicesMapping: {},
    sockets: {}
  }
})
@Injectable()
export class HStreamsState {
  constructor(private store: Store, private wsPool: WsPool, private http: HttpClient) {
  }

  static getServiceIdByName(url: string, service: string) {
    return createSelector([HStreamsState], (state: HStreamStateModel) => {
      return state.servicesMapping[url][service];
    });
  }


  static getSocket(key: string) {
    return createSelector([HStreamsState], (state: HStreamStateModel) => {
      return state.sockets[key];
    });
  }

  @Action(AddSocket)
  addSocket({ getState, setState }: StateContext<HStreamStateModel>, { url }: AddSocket) {
    console.log("NEW SOCKET");
    if (!getState().sockets[url]) {
      console.log("NEW SOCKET2");
      this.wsPool.createSocket(url, "bla");
      setState(patch({
        sockets: patch({ [url]: WebSocketState.NEW })
      }));

      this.store.dispatch(new ConnectSocket(url));
    }
  }

  @Action(UpdateServiceMapping)
  async updateServiceMapping({ getState, setState }: StateContext<HStreamStateModel>, {
    url,
    httpUrl
  }: UpdateServiceMapping) {

    firstValueFrom(this.http.get<{[serviceName: string]: number}>(httpUrl)).then(result=> {
      setState(patch({
        servicesMapping: patch({ [url]: result})
      }));
    });
  }


  @Action(RemoveSocket)
  remove({ getState, setState }: StateContext<HStreamStateModel>, { url }: RemoveSocket) {
    this.store.dispatch(new DisconnectSocket(url));
    setState(patch({
      sockets: filterMap(getState().sockets, url)
    }));
  }


  @Action(DisconnectSocket)
  async disconnect({ getState, setState }: StateContext<HStreamStateModel>, { url }: DisconnectSocket) {
    this.wsPool.disconnect(url);

    setState(patch({
      sockets: patch({ url: WebSocketState.DISCONNECTED })
    }));
  }


  @Action(ConnectSocket)
  async connect({ getState, setState }: StateContext<HStreamStateModel>, { url }: ConnectSocket) {
    this.wsPool.connect(url);

    setState(patch({
      sockets: patch({ url: WebSocketState.CONNECTED })
    }));
  }


  @Action(SocketConnected)
  async connected({ getState, setState }: StateContext<HStreamStateModel>, { url }: ConnectSocket) {
    this.wsPool.initProcessing(url);
    setState(patch({
      sockets: patch({ url: WebSocketState.ACTIVE })
    }));
  }

  @Action(ErrorSocket)
  async errorSocket({ getState, setState }: StateContext<HStreamStateModel>, { url, message }: ErrorSocket) {
    this.wsPool.socketError(url, message);
    setState(patch({
      sockets: patch({ url: WebSocketState.ERROR })
    }));
  }

}
