import { Injectable } from "@angular/core";
import { HStreamService } from "@solenopsys/fl-hyperstreams";
import { firstValueFrom, map } from "rxjs";
import {
  AddRepoRequest,
  ChartsResponse,
  GetChartsRequest,
  GetReposRequest,
  OperationStatus, RemoveRepoRequest,
  ReposResponse
} from "./api";

@Injectable({
  providedIn: "root"
})
export class HelmLookupService { // todo remove dubles

  constructor(private hss: HStreamService) {
  }

  private serviceName = "richteri-fl-helm-lookup";

  getRepos(filter: string): Promise<ReposResponse> {
    const r: GetReposRequest = { filter: filter };
    let x = GetReposRequest.encode(r).finish();
    const buffer = new Uint8Array(x.buffer, x.byteOffset, x.byteLength);

    return firstValueFrom<ReposResponse>(this.hss.createBinaryQuery(this.serviceName, buffer, 1).pipe(map( //todo constants
      (result: ArrayBuffer) => {
        return ReposResponse.decode(new Uint8Array(result));
      }
    )));
  }

  addRepo(url: string, name: string): Promise<OperationStatus> {
    const r: AddRepoRequest = { url,name };
    let x = AddRepoRequest.encode(r).finish();
    const buffer = new Uint8Array(x.buffer, x.byteOffset, x.byteLength);

    return firstValueFrom<OperationStatus>(this.hss.createBinaryQuery(this.serviceName, buffer, 2).pipe(map(
      (result: ArrayBuffer) => {
        return OperationStatus.decode(new Uint8Array(result));
      }
    )));
  }

  removeRepo(url: string): Promise<OperationStatus> {
    const r: RemoveRepoRequest = { url };
    let x = RemoveRepoRequest.encode(r).finish();
    const buffer = new Uint8Array(x.buffer, x.byteOffset, x.byteLength);

    return firstValueFrom<OperationStatus>(this.hss.createBinaryQuery(this.serviceName, buffer, 3).pipe(map(
      (result: ArrayBuffer) => {
        return OperationStatus.decode(new Uint8Array(result));
      }
    )));
  }


  getCharts(filter: string,reload:boolean): Promise<ChartsResponse> {
    const r: GetChartsRequest = { filter: filter, reload: reload };
    const x = GetChartsRequest.encode(r).finish();
    const buffer = new Uint8Array(x.buffer, x.byteOffset, x.byteLength);

    console.log("GET CHARTs", buffer.byteLength);
    return firstValueFrom<ChartsResponse>(this.hss.createBinaryQuery(this.serviceName, buffer, 4).pipe(map(
      (result: ArrayBuffer) => {
        return ChartsResponse.decode(new Uint8Array(result));
      }
    )));
  }


}
