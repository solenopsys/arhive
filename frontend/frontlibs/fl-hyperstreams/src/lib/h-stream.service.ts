import {Injectable} from "@angular/core";

import {Select, Store,} from "@ngxs/store";
import {AddSocket, UpdateServiceMapping} from "./hstreams.store";
import {StreamsPool, WsPool} from "./ws-pool";
import {Observable} from "rxjs";
import {DataHstreamModule} from "./data-hstream.module";
import {ClusterState, Cluster} from "@solenopsys/fl-clusters"


@Injectable({
    providedIn: DataHstreamModule
})
export class HStreamService {
    //@TsIgnore
    @Select(ClusterState.getClusters) clusters$!: Observable<Cluster[]>;


    constructor(private store: Store, private sp: StreamsPool, private ws: WsPool) {

        setTimeout(() => {
            const currentCluster: any = this.store.selectSnapshot(ClusterState.getClusters);
            for (const cluster of currentCluster) {
                let wsUrl: string = this.genWsUrl(cluster);
                let infoUrl: string = this.genInfoUrl(cluster);
                store.dispatch(new AddSocket(wsUrl));
                store.dispatch(new UpdateServiceMapping(wsUrl, infoUrl));
            }

            //    this.clusters$.subscribe(clusters$)
        });


    }


    public genWsUrl(cluster: Cluster): string {
        const protocol = cluster.ssl ? "wss" : "ws";
        return `${protocol}://${cluster.host}/hs/websocket`;
    }

    public genInfoUrl(cluster: Cluster): string {
        const protocol = cluster.ssl ? "https" : "http";
        return `${protocol}://${cluster.host}/hs/services`;
    }


    createStringQuery(service: string, query: string, funcId: number): Observable<any> {
        const currentCluster = this.store.selectSnapshot(ClusterState.getCurrent);
        if(!currentCluster) throw new Error("No current cluster");
        return this.createStringQueryCluster(this.genWsUrl(currentCluster), service, query, funcId);
    }


    createStringQueryCluster(url: string, service: string, query: string, funcId: number): Observable<any> {
        return this.createBinaryQueryCluster(url, service, new TextEncoder().encode(query), funcId);
    }

    createBinaryQuery(service: string, query: ArrayBuffer, funcId: number): Observable<any> {
        const currentCluster = this.store.selectSnapshot(ClusterState.getCurrent);
        if(!currentCluster) throw new Error("No current cluster");
        return this.createBinaryQueryCluster(this.genWsUrl(currentCluster), service, query, funcId);
    }

    createBinaryQueryCluster(url: string, service: string, query: ArrayBuffer, funcId: number): Observable<ArrayBuffer> {
        const hStream = this.sp.createStream(service, url);
        let socket = this.ws.sockets[url];

        hStream.output.subscribe((z: any) => {
            socket.output.next(z);
        });

        setTimeout(() => {
            hStream.send(query, funcId, true);
        });
        return hStream.pipe();
    }


}
