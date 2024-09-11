import { HStreamService } from "@solenopsys/fl-hyperstreams";
import { Injectable } from "@angular/core";

import { firstValueFrom, map } from "rxjs";
import {
  Chart,
  ChartsResponse,
  GetChartsRequest,
  InstallChartRequest,
  UninstallChartRequest,
  OperationStatus
} from "./api";


@Injectable({
  providedIn: "root"
})
export class HelmInstallerService {

  constructor(private hss: HStreamService) {
  }

  private serviceName = "hsm-installer";

  getCharts(filter: string, reload: boolean): Promise<ChartsResponse> {
    const r: GetChartsRequest = { filter: filter, reload: reload };
    const x = GetChartsRequest.encode(r).finish();
    const buffer = new Uint8Array(x.buffer, x.byteOffset, x.byteLength);

    console.log("GET CHARTs", buffer.byteLength);
    console.log("SERVICE NAME ", this.serviceName);
    return firstValueFrom<ChartsResponse>(this.hss.createBinaryQuery(this.serviceName, buffer, 1).pipe(map(
      (result: ArrayBuffer) => {
        return ChartsResponse.decode(new Uint8Array(result));
      }
    )));
  }

  installChart(chart: Chart): Promise<OperationStatus> {
    console.log("Chart", chart);
    let x = InstallChartRequest.encode({ chart }).finish();
    const buffer = new Uint8Array(x.buffer, x.byteOffset, x.byteLength);
    return firstValueFrom<OperationStatus>(this.hss.createBinaryQuery(this.serviceName, buffer, 2).pipe(map(
      (result: ArrayBuffer) => {
        return OperationStatus.decode(new Uint8Array(result));
      }
    )));
  }

  uninstallChart(digest: string): Promise<OperationStatus> {
    console.log("DIGEST", digest);
    let x = UninstallChartRequest.encode({ digest }).finish();
    const buffer = new Uint8Array(x.buffer, x.byteOffset, x.byteLength);
    return firstValueFrom<OperationStatus>(this.hss.createBinaryQuery(this.serviceName, buffer, 3).pipe(map(
      (result: ArrayBuffer) => {
        return OperationStatus.decode(new Uint8Array(result));
      }
    )));
  }

}
