import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {HStreamService} from "@solenopsys/fl-hyperstreams";

export type QConf = {
  name: string
  uri: string,
  query: string,
  map: (any) => any;
}


@Injectable({
  providedIn: "root"
})
export class KubernetesService {

  constructor(private hs: HStreamService) {
  }



  getRequestConf(q: string,mapFunc:any): Observable<any[]> {
    return this.hs.createStringQuery("hsm-kubernetes", q, 1).pipe(map(o => {
      var dec = new TextDecoder();
      let data = JSON.parse(dec.decode(o));
      console.log("FROM SERVER",data)
      return data
    })).pipe(map(mapFunc))
  }


}


